import * as THREE from './libs/three/three.module.js';

import {
    CSS2DRenderer
} from "./libs/three/jsm/renderers/CSS2DRenderer.js";

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
    BlochSphereEventsNamespace
} from "./events/bloch_sphere.js";

import {
    ToolboxEventsNamespace
} from "./events/toolbox.js";

import {
    NavbarEventsNamespace
} from "./events/navbar.js";


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
        // load workspace
        NavbarEventsNamespace.loadWorkspace();

        // get canves
        let canvas = document.getElementById("bloch-sphere");
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // set diameter to 80% of canvas size
        let diameter = (Math.min(canvasWidth, canvasHeight) / 100) * 80;

        // init scene
        GlobalContext.scene = new THREE.Scene();

        // init camera
        GlobalContext.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, diameter * 2);

        // set camera position
        GlobalContext.camera.position.set(diameter, diameter, diameter);
        GlobalContext.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // add camera to scene
        GlobalContext.scene.add(GlobalContext.camera);

        // init light and add to scene
        GlobalContext.light = new THREE.DirectionalLight(0xFFFFFF);
        GlobalContext.camera.add(GlobalContext.light);

        // init renderer
        GlobalContext.renderer = new THREE.WebGLRenderer();
        GlobalContext.renderer.setSize(canvasWidth, canvasHeight);
        GlobalContext.renderer.setPixelRatio(window.devicePixelRatio);

        // init label renderer
        GlobalContext.labelRenderer = new CSS2DRenderer();
        GlobalContext.labelRenderer.setSize(canvasWidth, canvasHeight);
        GlobalContext.labelRenderer.domElement.style.position = 'absolute';
		GlobalContext.labelRenderer.domElement.style.top = 0;

        // append render and label renderer to canvas
        canvas.appendChild(GlobalContext.renderer.domElement);
        canvas.appendChild(GlobalContext.labelRenderer.domElement);

        // init orbit controls
        GlobalContext.controls = new OrbitControls(GlobalContext.camera, GlobalContext.labelRenderer.domElement);
        GlobalContext.controls.minDistance = diameter / 4;
        GlobalContext.controls.maxDistance = diameter * 2;

        // initialize blochsphere
        GlobalContext.blochSphere = new BlochSphere(diameter / 2, {
            theta: GlobalContext.blochSphereStateProperties.theta,
            phi: GlobalContext.blochSphereStateProperties.phi,
            color: new THREE.Color(0x808080),
            axesLength: (diameter / 2) + ((diameter / 2) * 0.2),
            axesWidth: 2
        });

        // add blochsphere to scene
        GlobalContext.scene.add(GlobalContext.blochSphere);

        // start all events listeners
        GlobalContext.startAllEventListeners();

        // update blochsphere state
        BlochSphereEventsNamespace.updateBlochSphereState();

        // save workspace
        NavbarEventsNamespace.saveWorkspace();
    },

    onload: function () {
        GlobalContext.init();
        GlobalContext.animate();
    },

    onresize: function () {
        // get canves
        let canvas = document.getElementById("bloch-sphere");
        let canvasWidth = canvas.offsetWidth;
        let canvasHeight = canvas.offsetHeight;

        // update camera
        GlobalContext.camera.aspect = canvasWidth / canvasHeight;
        GlobalContext.camera.updateProjectionMatrix();

        // update renderer and label renderer
        GlobalContext.renderer.setSize(canvasWidth, canvasHeight);
        GlobalContext.labelRenderer.setSize(canvasWidth, canvasHeight);
    },

    startAllEventListeners: function () {
        NavbarEventsNamespace.startNavbarEventListeners();
        ToolboxEventsNamespace.startToolboxEventListeners();
    },

    animate: function () {
        requestAnimationFrame(GlobalContext.animate);

        // animate blochsphere operation
        BlochSphereEventsNamespace.blochSphereOperation();

        // rendering
        GlobalContext.renderer.render(GlobalContext.scene, GlobalContext.camera);
        GlobalContext.labelRenderer.render(GlobalContext.scene, GlobalContext.camera);
    }
}

export {
    GlobalContext
};
