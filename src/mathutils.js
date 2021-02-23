import * as THREE from './libs/three/three.module.js';

import {
    PRECISION
} from "./constants.js";


class Float {
    // Returns floating point number with given precision
    // Adds sign as prefix for both positive and negative numbers
    static round(num, precision) {
        if (precision == null) {
            precision = PRECISION;
        }

        if (typeof num === "string") {
            num = parseFloat(num);
        }

        let result = parseFloat(num.toFixed(precision)).toFixed(precision);

        if (result >= 0) {
            result = "+" + result;
        }

        return result;
    }

    // Returns absolute value of number with given precision
    // Removes sign from prefix for both positive and negative numbers
    static abs(num, precision) {
        if (precision == null) {
            precision = PRECISION;
        }

        if (typeof num === "string") {
            num = parseFloat(num);
        }

        let result = parseFloat(num.toFixed(precision)).toFixed(precision);

        if (result < 0) {
            result *= -1;
        }

        return result;
    }
}

class Complex {
    constructor(real, img) {
        this.real = Float.round(real);
        this.img = Float.round(img);
    }

    toString() {
        if (this.img < 0) {
            return this.real.toString() + " - i * " + Float.abs(this.img).toString();
        }
        else {
            return this.real.toString() + " + i * " + Float.abs(this.img).toString();
        }
    }
}

class Vector3Helpers {
    static angleBetweenVectors(vector1, vector2, planeNormal) {
        let angle = THREE.Math.radToDeg(vector1.angleTo(vector2));
        let crossProduct = new THREE.Vector3();

        crossProduct.crossVectors(vector1, vector2);
        if (Float.round(crossProduct.dot(planeNormal)) < 0) {
            angle *= -1;
        }

        return angle;
    }
}

export {
    Float,
    Complex,
    Vector3Helpers
};
