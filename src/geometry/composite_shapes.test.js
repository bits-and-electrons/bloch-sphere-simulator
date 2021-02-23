import * as THREE from '../libs/three/three.module.js';

import {
    Axis, CartesianAxes,
    StatePointer
} from "./composite_shapes.js";


test("axis-basic", () => {
    let testObj = new Axis(10, 10, {
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));
});

test("cartesian-axes-basic", () => {
    let testObj = new CartesianAxes(10, 10, {
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));
});

test("state-pointer-basic", () => {
    let testObj = new StatePointer(10, 10, {
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));
});
