
class Complex {
    constructor(real, img) {
        this.real = real;
        this.img = img;
    }

    toFixed(n) {
        return this.real.toFixed(n) + " + i * " + this.img.toFixed(n);
    }
}

export {
    Complex
};
