import {
    BlochSphere
} from "./bloch_sphere.js";


test("bloch-sphere-basic", () => {
    let testObj = new BlochSphere(10, {
        color: 0x808080,
        axesLength: 12,
        axesWidth: 2
    });

    expect(
        testObj.posX()
    ).toBe(0);

    expect(
        testObj.posY()
    ).toBe(0);

    expect(
        testObj.posZ()
    ).toBe(0);

    expect(
        testObj.children.length
    ).toBe(3);

    expect(
        testObj.statePointer.theta()
    ).toBe(0);

    expect(
        testObj.statePointer.phi()
    ).toBe(90);
});
