import {
    Complex
} from "../math/complex.js";

import {
    BlochSphereState
} from "./bloch_sphere_state.js";


test("bloch-sphere-state-basic", () => {
    let testObj = new BlochSphereState(0, 90);

    expect(
        testObj.theta
    ).toBe("+0.0000");

    expect(
        testObj.phi
    ).toBe("+90.0000");

    expect(
        testObj.alpha
    ).toBe("+1.0000");

    expect(
        testObj.beta.toString()
    ).toBe(new Complex(0, 0).toString());

    expect(
        testObj.x
    ).toBe("+0.0000");

    expect(
        testObj.y
    ).toBe("+0.0000");

    expect(
        testObj.z
    ).toBe("+1.0000");
});
