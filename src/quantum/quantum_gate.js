import * as THREE from '../libs/three/three.module.js';

import { 
    CartesianAxes
 } from "../geometry/composite_shapes.js";


class QuantumGate {
    constructor(x, y, z, rotation) {
        this.axis = new THREE.Vector3(x, y, z);
        this.rotation = rotation;
    }

    get transformationAxis() {
        return CartesianAxes.Vector3(this.axis.x, this.axis.y, this.axis.z).normalize();
    }
}

export {
    QuantumGate
};
