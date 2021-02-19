import { 
    CartesianAxes
 } from "../geometry/composite_shapes.js";

class QuantumGate {
    constructor(x, y, z, rotation) {
        this.axis = new THREE.Vector3(x, y, z);
        this.rotation = rotation;
    }

    get transformationAxis() {
        let transformAxis = new THREE.Vector3();

        transformAxis.add(CartesianAxes.XAxis.multiplyScalar(this.axis.x));
        transformAxis.add(CartesianAxes.YAxis.multiplyScalar(this.axis.y));
        transformAxis.add(CartesianAxes.ZAxis.multiplyScalar(this.axis.z));

        return transformAxis.normalize();
    }
}

export {
    QuantumGate
};
