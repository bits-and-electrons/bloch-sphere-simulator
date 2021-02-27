import * as THREE from './libs/three/three.module.js';

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
    NavbarEvents,
    ToolboxEvents, BlochSphereStateEvents
} from "./events.js";


var GlobalContext = {
    canvas: null,

    scene: null, camera: null, light: null,
    renderer: null, labelRenderer: null, controls: null,

    blochSphere: null,

    blochSphereOperation: {
        inProgress: false,
        rotationAxis: null,
        rotation: 0
    },

    blochSphereStateProperties: {
        theta: "0.0000",
        phi: "90.0000"
    },

    builtInGatesProperties: {
        "px-builtInGate": new QuantumGate(
            1, 0, 0, 180
        ),
        "py-builtInGate": new QuantumGate(
            0, 1, 0, 180
        ),
        "pz-builtInGate": new QuantumGate(
            0, 0, 1, 180
        ),
        "h-builtInGate": new QuantumGate(
            1, 0, 1, 180
        ),
        "px-12-builtInGate": new QuantumGate(
            1, 0, 0, 90
        ),
        "py-12-builtInGate": new QuantumGate(
            0, 1, 0, 90
        ),
        "pz-12-builtInGate": new QuantumGate(
            0, 0, 1, 90
        ),
        "pxi-12-builtInGate": new QuantumGate(
            1, 0, 0, -90
        ),
        "pyi-12-builtInGate": new QuantumGate(
            0, 1, 0, -90
        ),
        "pzi-12-builtInGate": new QuantumGate(
            0, 0, 1, -90
        ),
        "s-builtInGate": new QuantumGate(
            0, 0, 1, 90
        ),
        "si-builtInGate": new QuantumGate(
            0, 0, 1, -90
        ),
        "px-14-builtInGate": new QuantumGate(
            1, 0, 0, 45
        ),
        "py-14-builtInGate": new QuantumGate(
            0, 1, 0, 45
        ),
        "pz-14-builtInGate": new QuantumGate(
            0, 0, 1, 45
        ),
        "pxi-14-builtInGate": new QuantumGate(
            1, 0, 0, -45
        ),
        "pyi-14-builtInGate": new QuantumGate(
            0, 1, 0, -45
        ),
        "pzi-14-builtInGate": new QuantumGate(
            0, 0, 1, -45
        )
    },

    customGatesProperties: {

    },

    lambdaGatesProperties: {
        polarAngle: "0",
        azimuthAngle: "0"
    },

    init: function () {
        // Load Workspace
        NavbarEvents.loadWorkspace();

        // Get Canves
        let canvas = document.getElementById("bloch-sphere");
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // Set diameter to 80% of Canvas size
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
            theta: GlobalContext.blochSphereStateProperties.theta,
            phi: GlobalContext.blochSphereStateProperties.phi,
            color: new THREE.Color(0x808080),
            axesLength: (diameter / 2) + ((diameter / 2) * 0.2),
            axesWidth: 2
        });

        // Add BlochSphere to Scene
        GlobalContext.scene.add(GlobalContext.blochSphere);

        // Start all events listeners
        GlobalContext.startAllEventListeners();

        // Update BlochSphereState
        BlochSphereStateEvents.updateBlochSphereState();

        // Save Workspace
        NavbarEvents.saveWorkspace();
    },

    onload: function () {
        GlobalContext.init();
        GlobalContext.animate();
    },

    onresize: function () {
        // Get Canves
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
        NavbarEvents.eventListeners();
        ToolboxEvents.eventListeners();
    },

    startBlochSphereOperation: function (gate) {
        ToolboxEvents.disableQuantumGates();

        GlobalContext.blochSphereOperation.inProgress = true;

        GlobalContext.blochSphereOperation.rotationAxis = gate.rotationAxis;
        GlobalContext.blochSphereOperation.rotation = gate.rotation
    },

    animate: function () {
        requestAnimationFrame(GlobalContext.animate);

        if (GlobalContext.blochSphereOperation.inProgress) {
            if (GlobalContext.blochSphereOperation.rotation == 0) {
                GlobalContext.blochSphereOperation.inProgress = false;
                ToolboxEvents.enableQuantumGates();

                // Get BlochSphereState
                let blochSphereState = GlobalContext.blochSphere.blochSphereState;

                // Save Theta & Phi
                GlobalContext.blochSphereStateProperties.theta = blochSphereState.theta;
                GlobalContext.blochSphereStateProperties.phi = blochSphereState.phi;

                // Save Workspace
                NavbarEvents.saveWorkspace();
            }
            else {
                if (GlobalContext.blochSphereOperation.rotation > 0) {
                    // Apply Delta Quantum Operation
                    GlobalContext.blochSphereOperation.rotation -= 1;
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(1));
                }
                else {
                    // Apply Delta Quantum Operation
                    GlobalContext.blochSphereOperation.rotation += 1;
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(-1));
                }

                // Update BlochSphereState
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
