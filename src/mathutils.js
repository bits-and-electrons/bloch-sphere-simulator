
class Complex {
    constructor(real, img) {
        this.real = real;
        this.img = img;
    }

    toFixed(n) {
        return this.real.toFixed(n) + " + i * " + this.img.toFixed(n);
    }
}

class Vector3Helpers {
    static angleBetweenVectors(vector1, vector2, planeNormal) {
        let angle = THREE.Math.radToDeg(vector1.angleTo(vector2));

        if (true) {
            let crossProduct = new THREE.Vector3();

            crossProduct.crossVectors(vector1, vector2);
            if (crossProduct.dot(planeNormal) < 0) {
                angle *= -1;
            }
        }

        return angle;
    }
}

export {
    Complex,
    Vector3Helpers
};
