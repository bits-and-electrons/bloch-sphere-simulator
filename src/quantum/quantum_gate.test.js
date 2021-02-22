import {
    QuantumGate
} from "./quantum_gate.js";


test("quantum-gate-basic", () => {
    let testObj = new QuantumGate(1, 0, 1, 180);

    expect(
        testObj.transformationAxis.x
    ).toBe(0);

    expect(
        testObj.transformationAxis.y
    ).toBeCloseTo(0.7071, 4);

    expect(
        testObj.transformationAxis.z
    ).toBeCloseTo(0.7071, 4);
});
