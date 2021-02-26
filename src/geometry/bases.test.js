import * as THREE from '../libs/three/three.module.js';

import {
    BaseMesh,
    BaseGroup
} from "./bases.js";


class TestBaseMesh extends BaseMesh {
    constructor(properties) {
        let testGeometry = new THREE.CylinderGeometry();
        let testMaterial = new THREE.MeshPhongMaterial();

        super(testGeometry, testMaterial, properties);
    }
}

class TestBaseGroup extends BaseGroup {
    constructor(properties) {
        super(properties);

        this.add(new BaseMesh(new THREE.CylinderGeometry(), new THREE.MeshPhongMaterial()));
        this.add(new BaseMesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial()));
        this.add(new BaseMesh(new THREE.ConeGeometry(), new THREE.MeshPhongMaterial()));
    }
}

test("base-mesh-default", () => {
    let testObj = new TestBaseMesh();

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));
});

test("base-mesh-custom", () => {
    let testObj = new TestBaseMesh({
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

test("base-group-default", () => {
    let testObj = new TestBaseGroup();

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(0, 0, 0)));
});

test("base-group-custom", () => {
    let testObj = new TestBaseGroup({
        position: new THREE.Vector3(10, 10, 10),
        rotation: new THREE.Vector3(10, 10, 10)
    });

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        JSON.stringify(new THREE.Vector3(testObj.posX(), testObj.posY(), testObj.posZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));

    expect(
        JSON.stringify(new THREE.Vector3(testObj.rotX(), testObj.rotY(), testObj.rotZ()))
    ).toBe(JSON.stringify(new THREE.Vector3(10, 10, 10)));
});
