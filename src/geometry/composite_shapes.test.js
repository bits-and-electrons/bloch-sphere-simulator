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
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(10, 10, 10, 'XYZ')));
});

test("cartesian-axes-basic", () => {
    let testObj = new CartesianAxes(10, 10, {
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(10, 10, 10, 'XYZ')));
});

test("state-pointer-basic", () => {
    let testObj = new StatePointer(10, 10, {
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(10, 10, 10, 'XYZ')));
});
