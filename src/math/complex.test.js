import {
    Complex
} from "./complex.js";


test("complex-test1", () => {
    expect(
        new Complex(2, 3).toString()
    ).toBe("+2.0000 + i * 3.0000");
});

test("complex-test2", () => {
    expect(
        new Complex(3, -4).toString()
    ).toBe("+3.0000 - i * 4.0000");
});

test("complex-test3", () => {
    expect(
        new Complex(-6, -7).toString()
    ).toBe("-6.0000 - i * 7.0000");
});
