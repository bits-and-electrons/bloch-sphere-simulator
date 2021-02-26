import * as THREE from '../libs/three/three.module.js';

import {
    Cylinder,
    Sphere
} from "./basic_shapes.js";


test("cylinder-default", () => {
    let testObj = new Cylinder(12, 10, 10);

    expect(
        testObj.getColor()
            .equals(new THREE.Color(0xFFFFFF))
    ).toBe(true);

    expect(
        testObj.getParameters().radialSegments
    ).toBe(64);

    expect(
        testObj.getParameters().heightSegments
    ).toBe(64);

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(0, 0, 0, 'XYZ')));
});

test("cylinder-custom", () => {
    let testObj = new Cylinder(12, 10, 10, {
        color: new THREE.Color(0x000000),
        radialSegments: 32,
        heightSegments: 32,
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        testObj.getColor()
            .equals(new THREE.Color(0x000000))
    ).toBe(true);

    expect(
        testObj.getParameters().radialSegments
    ).toBe(32);

    expect(
        testObj.getParameters().heightSegments
    ).toBe(32);

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(10, 10, 10, 'XYZ')));
});

test("sphere-default", () => {
    let testObj = new Sphere(12);

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(0, 0, 0, 'XYZ')));
});

test("sphere-custom", () => {
    let testObj = new Sphere(12, {
        color: new THREE.Color(0x000000),
        opacity: 0.5,
        widthSegments: 18,
        heightSegments: 18,
        phiStart: Math.PI / 2,
        phiLength: Math.PI,
        thetaStart: Math.PI / 4,
        thetaLength: Math.PI / 2,
        skeleton: true,
        skeletonColor: new THREE.Color(0x888888),
        skeletonWidth: 2,
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        testObj.getColor()
            .equals(new THREE.Color(0x000000))
    ).toBe(true);

    expect(
        testObj.getOpacity()
    ).toBe(0.5);

    expect(
        testObj.getParameters().widthSegments
    ).toBe(18);

    expect(
        testObj.getParameters().heightSegments
    ).toBe(18);

    expect(
        testObj.getParameters().phiStart
    ).toBe(Math.PI / 2);

    expect(
        testObj.getParameters().phiLength
    ).toBe(Math.PI);

    expect(
        testObj.getParameters().thetaStart
    ).toBe(Math.PI / 4);

    expect(
        testObj.getParameters().thetaLength
    ).toBe(Math.PI / 2);

    expect(
        JSON.stringify(testObj.position)
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(testObj.rotation)
    ).toBe(JSON.stringify(new THREE.Euler(10, 10, 10, 'XYZ')));
});
