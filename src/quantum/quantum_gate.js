import * as THREE from '../libs/three/three.module.js';

import {
    CartesianAxes
} from "../geometry/composite_shapes.js";


class QuantumGate {
    static USING_ROTATIONS = "UsingRotations";
    static USING_MATRIX = "UsingMatrix";

    constructor(x, y, z, rotation, properties) {
        this.axis = new THREE.Vector3(x, y, z);
        this.rotation = rotation;
        this.properties = properties;

        if (!this.properties) this.properties = {};
        if (!this.properties.type) this.properties.type = QuantumGate.USING_ROTATIONS;
        if (!this.properties.title) this.properties.title = `Axis: ${x} * X + ${y} * Y + ${z} * Z, Rotation: ${rotation}`;
    }

    get rotationAxis() {
        return CartesianAxes.Vector3(this.axis.x, this.axis.y, this.axis.z).normalize();
    }

    static createQuantumGateUsingRotations(x, y, z, rotation) {
        let title = `Axis: ${x} * X + ${y} * Y + ${z} * Z, Rotation: ${rotation}`;

        return new QuantumGate(x, y, z, rotation, {
            "type": QuantumGate.USING_ROTATIONS,
            "title": title
        });
    }

    static createQuantumGateUsingMatrix(a11, a12, a21, a22) {
        let title = `[[${a11.toString()}, ${a12.toString()}], [${a21.toString()}, ${a22.toString()}]]`;

        // todo: convert matrix to rotations
        let x = 1;
        let y = 0;
        let z = 0;
        let rotation = 180;

        return new QuantumGate(x, y, z, rotation, {
            "type": QuantumGate.USING_MATRIX,
            "title": title
        });
    }

    static createQuantumGateUsingJsonString(jsonString) {
        return new QuantumGate(jsonString.axis.x, jsonString.axis.y, jsonString.axis.z, jsonString.rotation, jsonString.properties);
    }
}

export {
    QuantumGate
};
