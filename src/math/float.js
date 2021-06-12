import {
    PRECISION
} from "./../constants.js";


class Float {
    // returns floating point number with given precision
    // adds sign as prefix for both positive and negative numbers
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

    // returns absolute value of number with given precision
    // removes sign from prefix for both positive and negative numbers
    static abs(num, precision) {
        if (precision == null) {
            precision = PRECISION;
        }

        if (typeof num === "string") {
            num = parseFloat(num);
        }

        if (num < 0) {
            num *= -1;
        }

        let result = parseFloat(num.toFixed(precision)).toFixed(precision);

        return result;
    }
}


export {
    Float
}
