import {
    Complex,
    Vector3Helpers
} from "./mathutils.js";

import { 
    CartesianAxes
 } from "./geometry/composite_shapes.js";


test("complex-basic", () => {
    expect(
        new Complex(2, 3).toString()
    ).toBe("+2.0000 + i * 3.0000");
});

test("vector3-helpers-angle-between-vectors-basic", () => {
    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.XAxis, CartesianAxes.YAxis, CartesianAxes.ZAxis)
    ).toBe(90);

    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.XAxis, CartesianAxes.ZAxis, CartesianAxes.ZAxis)
    ).toBe(90);

    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.YAxis, CartesianAxes.ZAxis, CartesianAxes.ZAxis)
    ).toBe(90);

    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.YAxis, CartesianAxes.XAxis, CartesianAxes.ZAxis)
    ).toBe(-90);

    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.ZAxis, CartesianAxes.XAxis, CartesianAxes.ZAxis)
    ).toBe(90);

    expect(
        Vector3Helpers.angleBetweenVectors(CartesianAxes.ZAxis, CartesianAxes.YAxis, CartesianAxes.ZAxis)
    ).toBe(90);
});
