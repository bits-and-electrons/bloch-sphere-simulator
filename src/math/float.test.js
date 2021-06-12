import {
    Float
} from "./float.js";


test("float-test1", () => {
    expect(
        Float.round("2.423451", 4)
    ).toBe("+2.4235");

    expect(
        Float.abs("2.423451", 4)
    ).toBe("2.4235");
});

test("float-test2", () => {
    expect(
        Float.round("2.42", 4)
    ).toBe("+2.4200");

    expect(
        Float.abs("-2.423451", 4)
    ).toBe("2.4235");
});
