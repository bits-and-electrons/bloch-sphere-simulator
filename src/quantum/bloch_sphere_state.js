import * as THREE from '../libs/three/three.module.js';

import {
    Float,
    Complex
} from "../mathutils.js";


class BlochSphereState {
    constructor(theta, phi) {
        this.update(theta, phi);
    }

    load() {
        this.alpha = Float.parse(Math.cos(THREE.Math.degToRad(this.theta) / 2));
        this.beta = new Complex(
            Float.parse(Math.cos(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2)),
            Float.parse(Math.sin(THREE.Math.degToRad(this.phi)) * Math.sin(THREE.Math.degToRad(this.theta) / 2))
        );

        this.x = Float.parse(Math.sin(THREE.Math.degToRad(this.theta)) * Math.cos(THREE.Math.degToRad(this.phi)));
        this.y = Float.parse(Math.sin(THREE.Math.degToRad(this.theta)) * Math.sin(THREE.Math.degToRad(this.phi)));
        this.z = Float.parse(Math.cos(THREE.Math.degToRad(this.theta)));
    }

    update(theta, phi) {
        this.theta = Float.parse(theta);
        this.phi = Float.parse(phi);
        this.load();
    }
}

export {
    BlochSphereState
}
