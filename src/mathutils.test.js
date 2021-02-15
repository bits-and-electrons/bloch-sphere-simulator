import {
    Complex
} from "./mathutils.js";

test("basic", () => {
    expect(
        new Complex(2, 3).toFixed(3)
    ).toBe("2.000 + i * 3.000");
});
