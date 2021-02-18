import {
    OrbitControls
} from "./libs/three/jsm/controls/OrbitControls.js";

import {
    BlochSphere
} from "./quantum/bloch_sphere.js";

import {
    QuantumGate
} from "./quantum/quantum_gate.js";

import {
    ToolboxEvents,
    BlochSphereStateEvents
} from "./events.js";

import { 
    ToolboxEventListeners
} from "./event_listeners.js";


var GlobalContext = {
    canvas: null,

    scene: null, camera: null, light: null,
    renderer: null, labelRenderer: null, controls: null,

    blochSphere: null,
    blochSphereOperation: {
        inProgress: false,
        axis: null,
        rotation: 0
    },

    builtInQuantumGates: {
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

    customQuantumGates: {

    },

    init: function () {
        // Get Canves Details
        let canvas = document.getElementById("bloch-sphere");
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // Set Diameter to 80% of Canvas Size
        let diameter = (Math.min(canvasWidth, canvasHeight) / 100) * 80;

        // Init Scene
        GlobalContext.scene = new THREE.Scene();

        // Init Camera
        GlobalContext.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, diameter * 2);

        // Set Camera Position
        GlobalContext.camera.position.set(diameter, diameter, diameter);
        GlobalContext.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Add Camera to Scene
        GlobalContext.scene.add(GlobalContext.camera);

        // Init Light and add to Scene
        GlobalContext.light = new THREE.DirectionalLight(0xFFFFFF);
        GlobalContext.camera.add(GlobalContext.light);

        // Init Renderer
        GlobalContext.renderer = new THREE.WebGLRenderer();
        GlobalContext.renderer.setSize(canvasWidth, canvasHeight);

        // Append Render and LabelRenderer to Canvas
        canvas.appendChild(GlobalContext.renderer.domElement);

        // Init OrbitControls
        GlobalContext.controls = new OrbitControls(GlobalContext.camera, GlobalContext.renderer.domElement);
        GlobalContext.controls.minDistance = 1;
        GlobalContext.controls.maxDistance = diameter * 2;

        // Initialize BlochSphere
        GlobalContext.blochSphere = new BlochSphere(diameter / 2, {
            color: 0x808080,
            axesLength: (diameter / 2) + ((diameter / 2) * 0.2),
            axesWidth: 2
        });

        // Add BlochSphere to Scene
        GlobalContext.scene.add(GlobalContext.blochSphere);

        // Start All Events Listeners
        GlobalContext.startAllEventListeners();

        // Update BlochSphere State
        BlochSphereStateEvents.updateBlochSphereState();
    },

    onload: function () {
        GlobalContext.init();
        GlobalContext.animate();
    },

    onresize: function () {
        // Get Canves Details
        let canvas = document.getElementById("bloch-sphere");
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // Update Camera
        GlobalContext.camera.aspect = canvasWidth / canvasHeight;
        GlobalContext.camera.updateProjectionMatrix();

        // Update Renderer 
        GlobalContext.renderer.setSize(canvasWidth, canvasHeight);
    },

    startAllEventListeners: function () {
        ToolboxEventListeners.startAllEventListeners();
    },

    startBlochSphereOperation: function (gate) {
        ToolboxEvents.disableQuantumGates();

        GlobalContext.blochSphereOperation.inProgress = true;

        GlobalContext.blochSphereOperation.axis = gate.axis;
        GlobalContext.blochSphereOperation.rotation = gate.rotation
    },

    animate: function () {
        requestAnimationFrame(GlobalContext.animate);

        if (GlobalContext.blochSphereOperation.inProgress) {
            if (GlobalContext.blochSphereOperation.rotation == 0) {
                GlobalContext.blochSphereOperation.inProgress = false;
                ToolboxEvents.enableQuantumGates();
            }
            else {
                if (GlobalContext.blochSphereOperation.rotation > 0) {
                    // Apply Delta Quantum Operation
                    GlobalContext.blochSphereOperation.rotation -= 1;
                    GlobalContext.blochSphere.updateQuantumState(GlobalContext.blochSphereOperation.axis.normalize(), THREE.Math.degToRad(1));
                }
                else {
                    // Apply Delta Quantum Operation
                    GlobalContext.blochSphereOperation.rotation += 1;
                    GlobalContext.blochSphere.updateQuantumState(GlobalContext.blochSphereOperation.axis.normalize(), THREE.Math.degToRad(-1));
                }

                // Update BlochSphere State
                BlochSphereStateEvents.updateBlochSphereState();
            }
        }

        // Rendering
        GlobalContext.renderer.render(GlobalContext.scene, GlobalContext.camera);
    }
}

export {
    GlobalContext
};
