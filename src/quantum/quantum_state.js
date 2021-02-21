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

    round() {
        this.theta = parseFloat(this.theta.toFixed(4));
        this.phi = parseFloat(this.phi.toFixed(4));

        this.alpha = parseFloat(this.alpha.toFixed(4));
        this.beta = parseFloat(this.beta.toFixed(4));

        this.x = parseFloat(this.x.toFixed(4));
        this.y = parseFloat(this.y.toFixed(4));
        this.z = parseFloat(this.z.toFixed(4));
    }

    update(theta, phi) {
        this.theta = theta;
        this.phi = phi;

        this.load();
        this.round();
    }
}

export {
    QuantumState
}
