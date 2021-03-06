import * as THREE from '../libs/three/three.module.js';

import {
    BaseGroup
} from "./bases.js";

import {
    Cylinder, Sphere
} from "./basic_shapes.js";

import {
    Vector3Helpers
} from "../mathutils.js";


class Axis extends BaseGroup {
    constructor(height, width, properties) {
        if (!properties) properties = {};

        if (!properties.color) properties.color = new THREE.Color(0xFFFFFF);

        super(properties);

        this.head = new Cylinder(height * 0.1, 0, width * 3.0, {
            color: properties.color,
            position: new THREE.Vector3(0, (height / 2) - ((height * 0.1) / 2), 0)
        });

        this.shaft = new Cylinder(height * (1 - 0.1), width, width, {
            color: properties.color,
            position: new THREE.Vector3(0, -1 * height * (0.1 / 2), 0)
        });

        this.add(this.head);
        this.add(this.shaft);
    }
}

class CartesianAxes extends BaseGroup {
    constructor(length, width, properties) {
        if (!properties) properties = {};

        if (!properties.xAxisColor) properties.xAxisColor = new THREE.Color(0xFF0000);
        if (!properties.yAxisColor) properties.yAxisColor = new THREE.Color(0x00FF00);
        if (!properties.zAxisColor) properties.zAxisColor = new THREE.Color(0x0000FF);

        super(properties);

        this.xAxis = new Axis(length, width, {
            color: properties.xAxisColor,
            position: new THREE.Vector3(0, 0, length / 2),
            rotation: new THREE.Vector3(THREE.Math.degToRad(90), 0, 0)
        });

        this.yAxis = new Axis(length, width, {
            color: properties.yAxisColor,
            position: new THREE.Vector3(length / 2, 0, 0),
            rotation: new THREE.Vector3(0, 0, -1 * THREE.Math.degToRad(90))
        });

        this.zAxis = new Axis(length, width, {
            color: properties.zAxisColor,
            position: new THREE.Vector3(0, length / 2, 0)
        });

        this.add(this.xAxis);
        this.add(this.yAxis);
        this.add(this.zAxis);
    };

    static get XAxis() {
        return new THREE.Vector3(0, 0, 1);
    }

    static get YAxis() {
        return new THREE.Vector3(1, 0, 0);
    }

    static get ZAxis() {
        return new THREE.Vector3(0, 1, 0);
    }

    static Vector3(x, y, z) {
        let transformedAxis = new THREE.Vector3();

        transformedAxis.add(CartesianAxes.XAxis.multiplyScalar(x));
        transformedAxis.add(CartesianAxes.YAxis.multiplyScalar(y));
        transformedAxis.add(CartesianAxes.ZAxis.multiplyScalar(z));

        return transformedAxis;
    }
}

class StatePointer extends BaseGroup {
    constructor(height, width, properties) {
        if (!properties) properties = {};

        if (!properties.color) properties.color = new THREE.Color(0xFFFFFF);

        if (!properties.pointerRadius) properties.pointerRadius = 5;

        super(properties);

        let head = new Sphere(properties.pointerRadius, {
            color: properties.color,
            position: new THREE.Vector3(0, height / 2, 0)
        });

        let shaft = new Cylinder(height, width, width, {
            color: properties.color
        });

        this.add(head);
        this.add(shaft);
    }

    rotate(axis, point, angle) {
        this.parent.localToWorld(this.position);

        this.position.sub(point);
        this.position.applyAxisAngle(axis, angle);
        this.position.add(point);

        this.rotateOnWorldAxis(axis, angle);

        this.parent.worldToLocal(this.position);
    }

    theta() {
        return Vector3Helpers.angleBetweenVectors(CartesianAxes.ZAxis, this.position, CartesianAxes.ZAxis);
    }

    phi() {
        return Vector3Helpers.angleBetweenVectors(CartesianAxes.XAxis, this.position, CartesianAxes.ZAxis);
    }
}

export {
    Axis, CartesianAxes,
    StatePointer
};
