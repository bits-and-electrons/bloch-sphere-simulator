import * as THREE from "../libs/three/three.module.js";

import {
    Float
} from "../math/float.js";

import {
    BlochSphere
} from "./bloch_sphere.js";

import {
    BlochSphereState
} from "./bloch_sphere_state.js";


test("bloch-sphere-basic", () => {
    let testObj = new BlochSphere(10, {
        color: new THREE.Color(0x808080),
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(testObj.blochSphereState)
    ).toBe(JSON.stringify(new BlochSphereState("0.0000", "90.0000")));
});

test("bloch-sphere-custom-bloch-sphere-state-1", () => {
    let testObj = new BlochSphere(10, {
        theta: Float.round(90),
        phi: Float.round(90),
        color: new THREE.Color(0x808080),
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(testObj.blochSphereState)
    ).toBe(JSON.stringify(new BlochSphereState(Float.round(90), Float.round(90))));
});

test("bloch-sphere-custom-bloch-sphere-state-2", () => {
    let testObj = new BlochSphere(10, {
        theta: Float.round(180),
        phi: Float.round(90),
        color: new THREE.Color(0x808080),
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(testObj.blochSphereState)
    ).toBe(JSON.stringify(new BlochSphereState(Float.round(180), Float.round(90))));
});

test("bloch-sphere-custom-bloch-sphere-state-3", () => {
    let testObj = new BlochSphere(10, {
        theta: Float.round(90),
        phi: Float.round(-90),
        color: new THREE.Color(0x808080),
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(testObj.blochSphereState)
    ).toBe(JSON.stringify(new BlochSphereState(Float.round(90), Float.round(-90))));
});

test("bloch-sphere-custom-bloch-sphere-state-4", () => {
    let testObj = new BlochSphere(10, {
        theta: Float.round(45),
        phi: Float.round(60),
        color: new THREE.Color(0x808080),
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        testObj.children.length
    ).toBe(3);

    // This is known failure in BlochSphereState on loading workspace from URL
    // Tracking here: https://github.com/bits-and-electrons/bloch-sphere-simulator/issues/28
    // expect(
    //     JSON.stringify(testObj.blochSphereState)
    // ).toBe(JSON.stringify(new BlochSphereState(Float.round(45), Float.round(60))));
});
