import * as THREE from '../libs/three/three.module.js';

import {
    Cylinder,
    Sphere
} from "./basic_shapes.js";


test("cylinder-basic", () => {
    let testObj = new Cylinder(12, 10, 10, {
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

test("sphere-basic", () => {
    let testObj = new Sphere(12, {
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
