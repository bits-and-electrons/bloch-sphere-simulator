import { 
    CartesianAxes
 } from "../geometry/composite_shapes.js";

class QuantumGate {
    constructor(x, y, z, rotation) {
        this.axis = new THREE.Vector3();
        this.axis.add(CartesianAxes.XAxis.multiplyScalar(x));
        this.axis.add(CartesianAxes.YAxis.multiplyScalar(y));
        this.axis.add(CartesianAxes.ZAxis.multiplyScalar(z));

        this.rotation = rotation;
    }
}

export {
    QuantumGate
};
