import {
    Complex
} from "../mathutils.js";

import {
    BlochSphereState
} from "./bloch_sphere_state.js";

import {
    PRECISION
} from "../constants.js";


test("bloch-sphere-state-basic", () => {
    let testObj = new BlochSphereState(0, 90);

    expect(
        testObj.theta
    ).toBe(0);

    expect(
        testObj.phi
    ).toBe(90);

    expect(
        testObj.alpha
    ).toBe(1);

    expect(
        testObj.beta.toFixed(PRECISION)
    ).toBe(new Complex(0, 0).toFixed(PRECISION));

    expect(
        testObj.x
    ).toBe(0);

    expect(
        testObj.y
    ).toBe(0);

    expect(
        testObj.z
    ).toBe(1);
});
