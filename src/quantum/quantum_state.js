import {
    Complex
} from "../mathutils.js"

class QuantumState {
    constructor(theta, phi) {
        this.update(theta, phi);
    }

    load() {
        this.alpha = Math.cos(THREE.Math.degToRad(this.theta) / 2);
        this.beta = new Complex(
            Math.cos(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2),
            Math.sin(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2)
        );

        this.x = Math.sin(THREE.Math.degToRad(this.theta)) * Math.cos(THREE.Math.degToRad(this.phi));
        this.y = Math.sin(THREE.Math.degToRad(this.theta)) * Math.sin(THREE.Math.degToRad(this.phi));
        this.z = Math.cos(THREE.Math.degToRad(this.theta));
    }

    update(theta, phi) {
        this.theta = theta;
        this.phi = phi;
        this.load();
    }
}

export {
    QuantumState
}
