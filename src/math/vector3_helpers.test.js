import {
    Vector3Helpers
} from "./vector3_helpers.js";

import {
    CartesianAxes
} from "./../geometry/composite_shapes.js";


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
