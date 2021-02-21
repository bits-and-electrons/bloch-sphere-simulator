import {
    Complex
} from "../mathutils.js"

class QuantumState {
    constructor(theta, phi) {
        this.update(theta, phi);
    }

    load() {
        this.alpha = parseFloat(Math.cos(THREE.Math.degToRad(this.theta) / 2).toFixed(4));
        this.beta = new Complex(
            parseFloat((Math.cos(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2)).toFixed(4)),
            parseFloat((Math.sin(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2)).toFixed(4))
        );

        this.x = parseFloat((Math.sin(THREE.Math.degToRad(this.theta)) * Math.cos(THREE.Math.degToRad(this.phi))).toFixed(4));
        this.y = parseFloat((Math.sin(THREE.Math.degToRad(this.theta)) * Math.sin(THREE.Math.degToRad(this.phi))).toFixed(4));
        this.z = parseFloat(Math.cos(THREE.Math.degToRad(this.theta)).toFixed(4));
    }

    update(theta, phi) {
        this.theta = parseFloat(theta.toFixed(4));
        this.phi = parseFloat(phi.toFixed(4));
        this.load();
    }
}

export {
    QuantumState
}
