import { 
    CartesianAxes 
} from "../geometry/composite_shapes.js";

import {
    QuantumGate
} from "./quantum_gate.js";


test("quantum-gate-basic", () => {
    let testObj = new QuantumGate(1, 0, 0, 180);

    expect(
        JSON.stringify(testObj.rotationAxis)
    ).toBe(JSON.stringify(CartesianAxes.Vector3(1, 0, 0)));
});

test("quantum-gate-hadamard-gate", () => {
    let testObj = new QuantumGate(1, 0, 1, 180);

    expect(
        testObj.rotationAxis.x
    ).toBe(0);

    expect(
        testObj.rotationAxis.y
    ).toBeCloseTo(0.7071, 4);

    expect(
        testObj.rotationAxis.z
    ).toBeCloseTo(0.7071, 4);
});
