import {
    OrbitControls
} from "./libs/three/jsm/controls/OrbitControls.js";

import {
    BlochSphere
} from "./quantum/bloch_sphere.js"

import {
    QuantumGate
} from "./quantum/quantum_gate.js"

var globalContext = {
    canvas: null,

    scene: null, camera: null, light: null,
    renderer: null, labelRenderer: null, controls: null,

    blochSphere: null,
    blochSphereOperation: {
        inProgress: false,
        axis: null,
        rotation: 0
    },

    builtInGates: {
        "px-builtin-gate": new QuantumGate(
            1, 0, 0, 180
        ),
        "py-builtin-gate": new QuantumGate(
            0, 1, 0, 180
        ),
        "pz-builtin-gate": new QuantumGate(
            0, 0, 1, 180
        ),
        "h-builtin-gate": new QuantumGate(
            1, 0, 1, 180
        ),
        "px-12-builtin-gate": new QuantumGate(
            1, 0, 0, 90
        ),
        "py-12-builtin-gate": new QuantumGate(
            0, 1, 0, 90
        ),
        "pz-12-builtin-gate": new QuantumGate(
            0, 0, 1, 90
        ),
        "pxi-12-builtin-gate": new QuantumGate(
            1, 0, 0, -90
        ),
        "pyi-12-builtin-gate": new QuantumGate(
            0, 1, 0, -90
        ),
        "pzi-12-builtin-gate": new QuantumGate(
            0, 0, 1, -90
        ),
        "s-builtin-gate": new QuantumGate(
            0, 0, 1, 90
        ),
        "si-builtin-gate": new QuantumGate(
            0, 0, 1, -90
        ),
        "px-14-builtin-gate": new QuantumGate(
            1, 0, 0, 45
        ),
        "py-14-builtin-gate": new QuantumGate(
            0, 1, 0, 45
        ),
        "pz-14-builtin-gate": new QuantumGate(
            0, 0, 1, 45
        ),
        "pxi-14-builtin-gate": new QuantumGate(
            1, 0, 0, -45
        ),
        "pyi-14-builtin-gate": new QuantumGate(
            0, 1, 0, -45
        ),
        "pzi-14-builtin-gate": new QuantumGate(
            0, 0, 1, -45
        )
    },
    customGates: {

    },

    init: function () {
        // Get Canves Details
        globalContext.canvas = document.getElementById("bloch-sphere");
        let canvasWidth = globalContext.canvas.offsetWidth;
        let canvasHeight = globalContext.canvas.offsetHeight;

        // Set Diameter to 80% of Canvas Size
        let diameter = (Math.min(canvasWidth, canvasHeight) / 100) * 80;

        // Init Scene
        globalContext.scene = new THREE.Scene();

        // Init Camera
        globalContext.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, diameter * 2);

        // Set Camera Position
        globalContext.camera.position.set(diameter, diameter, diameter);
        globalContext.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Add Camera to Scene
        globalContext.scene.add(globalContext.camera);

        // Init Light
        globalContext.light = new THREE.DirectionalLight(0xFFFFFF);
        globalContext.camera.add(globalContext.light);

        // Init Renderer
        globalContext.renderer = new THREE.WebGLRenderer();
        globalContext.renderer.setSize(canvasWidth, canvasHeight);

        // Append Render and LabelRenderer to Canvas
        globalContext.canvas.appendChild(globalContext.renderer.domElement);

        // Init OrbitControls
        globalContext.controls = new OrbitControls(globalContext.camera, globalContext.renderer.domElement);
        globalContext.controls.minDistance = 1;
        globalContext.controls.maxDistance = diameter * 2;

        // Initialize BlochSphere
        globalContext.blochSphere = new BlochSphere(diameter / 2, {
            color: 0x808080,
            axesLength: (diameter / 2) + ((diameter / 2) * 0.2),
            axesWidth: 2
        });

        // Add BlochSphere to Scene
        globalContext.scene.add(globalContext.blochSphere);

        // Init Event Listeners
        globalContext.startEventListeners();

        // Update QuantumState
        globalContext.updateQuantumState();
    },

    onload: function () {
        globalContext.init();
        globalContext.animate();
    },

    onresize: function () {
        // Get Canves Details
        globalContext.canvas = document.getElementById("bloch-sphere");
        let canvasWidth = globalContext.canvas.offsetWidth;
        let canvasHeight = globalContext.canvas.offsetHeight;

        // Update Camera
        globalContext.camera.aspect = canvasWidth / canvasHeight;
        globalContext.camera.updateProjectionMatrix();

        // Update Renderer 
        globalContext.renderer.setSize(canvasWidth, canvasHeight);
    },

    enableQuantumGates: function () {
        $("button[id$='gate']").attr("disabled", false);
    },

    disableQuantumGates: function () {
        $("button[id$='gate']").attr("disabled", true);
    },

    quantumGateEventListener: function (gate) {
        globalContext.disableQuantumGates();

        globalContext.blochSphereOperation.inProgress = true;

        globalContext.blochSphereOperation.axis = gate.axis;
        globalContext.blochSphereOperation.rotation = gate.rotation
    },

    builtInQuantumGatesEventListeners: function () {
        $.each($("button[id$='builtin-gate']"), function (_, element) {
            let gate = globalContext.builtInGates[element.id];;

            $(element).click(function () {
                globalContext.quantumGateEventListener(gate);
            });
        });
    },

    createCustomGateEventListener: function () {
        $("#custom-gate-create").click(function () {
            if (!($("#custom-gates-form")[0].checkValidity())) {
                $("#custom-gates-form").addClass("was-validated");
            }
            else {
                // Create Custom Gate
                let customGateX = $("#custom-gate-x").val();
                let customGateY = $("#custom-gate-y").val();
                let customGateZ = $("#custom-gate-z").val();
                let customGateRotation = $("#custom-gate-rotation").val();

                let customGateCount = Object.keys(globalContext.customGates).length + 1;
                let customGateId = "c" + customGateCount + "-custom-gate";
    
                let customGate = new QuantumGate(customGateX, customGateY, customGateZ, customGateRotation);
                globalContext.customGates[customGateId] = customGate;
    
                let customGateHtml = `
                    <button type="button" id="${customGateId}" class="col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
                        data-toggle="tooltip" data-html="true" title="Axis: ${customGateX} * X + ${customGateY} * Y + ${customGateZ} * Z, Rotation: ${customGateRotation}">
                        <span>C<sub>${customGateCount}</sub></span>
                    </button>
                `;
    
                $(customGateHtml).insertBefore("#custom-gate-add");
    
                $("#" + customGateId).click(function () {
                    globalContext.quantumGateEventListener(customGate);
                });

                // Clear Custom Gate Model 
                $("#custom-gate-x").val("");
                $("#custom-gate-y").val("");
                $("#custom-gate-z").val("");
                $("#custom-gate-rotation").val("");

                $("#custom-gates-form").removeClass("was-validated");
            }
        })
    },

    lambdaGateEventListeners: function() {
        $("#polar-angle").on("input change", function(){
            let polarAngle = $("#polar-angle").val();

            // Update Content
            $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);
        });

        $("#azimuth-angle").on("input change", function(){
            let azimuthAngle = $("#azimuth-angle").val();

            // Update Content
            $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);
        });

        $("#polar-lambda-gate").click(function () {
            let polarAngle = $("#polar-angle").val();

            // Apply Lambda Gate
            let lambdaGate = new QuantumGate(0, 1, 0, polarAngle);
            globalContext.quantumGateEventListener(lambdaGate);
        });

        $("#azimuth-lambda-gate").click(function () {
            let polarAngle = $("#azimuth-angle").val();

            // Apply Lambda Gate
            let lambdaGate = new QuantumGate(0, 0, 1, polarAngle);
            globalContext.quantumGateEventListener(lambdaGate);
        });
    },

    startEventListeners: function () {
        // BuiltIn Quantum Gate Event Listeners
        globalContext.builtInQuantumGatesEventListeners();

        // Create Custom Gate Event Listener
        globalContext.createCustomGateEventListener();

        // Lambda Gate Event Listener
        globalContext.lambdaGateEventListeners();
    },

    updateQuantumState: function () {
        // Get Current QuantumState
        let quantumState = globalContext.blochSphere.quantumState;

        // Update Theta & Phi
        $("#quantum-state-theta").html(quantumState.theta.toFixed(4));
        $("#quantum-state-phi").html(quantumState.phi.toFixed(4));

        // Update Alpha & Beta
        $("#quantum-state-alpha").html(quantumState.alpha.toFixed(4));
        $("#quantum-state-beta").html(quantumState.beta.toFixed(4));

        // Update X, Y & Z
        $("#quantum-state-x").html(quantumState.x.toFixed(4));
        $("#quantum-state-y").html(quantumState.y.toFixed(4));
        $("#quantum-state-z").html(quantumState.z.toFixed(4));
    },

    animate: function () {
        requestAnimationFrame(globalContext.animate);

        if (globalContext.blochSphereOperation.inProgress) {
            if (globalContext.blochSphereOperation.rotation == 0) {
                globalContext.blochSphereOperation.inProgress = false;
                globalContext.enableQuantumGates();
            }
            else {
                if (globalContext.blochSphereOperation.rotation > 0) {
                    // Apply Delta BlochSphere Gate
                    globalContext.blochSphereOperation.rotation -= 1;
                    globalContext.blochSphere.updateQuantumState(globalContext.blochSphereOperation.axis.normalize(), THREE.Math.degToRad(1));
                }
                else {
                    // Apply Delta BlochSphere Gate
                    globalContext.blochSphereOperation.rotation += 1;
                    globalContext.blochSphere.updateQuantumState(globalContext.blochSphereOperation.axis.normalize(), THREE.Math.degToRad(-1));
                }

                // Update QuanutumState
                globalContext.updateQuantumState();
            }
        }

        // Start Rendering
        globalContext.renderer.render(globalContext.scene, globalContext.camera);
    }
}

window.onload = function () {
    globalContext.onload();
}

window.onresize = function () {
    globalContext.onresize();
}
