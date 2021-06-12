import {
    Float
} from "./float.js";


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


export {
    Complex
}
