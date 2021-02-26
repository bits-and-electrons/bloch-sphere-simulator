
let testBody = `
    <div id="bloch-sphere" class="col-12"></div>

    <button type="button" id="px-builtInGate" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
		data-toggle="tooltip" data-html="true" title="Axis: X, Rotation: 180">
	    <span>P<sub>x</sub></span>
    </button>

    <button type="button" id="py-builtInGate" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
		data-toggle="tooltip" data-html="true" title="Axis: X, Rotation: 180">
	    <span>P<sub>x</sub></span>
    </button>

    <button type="button" id="pz-builtInGate" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
		data-toggle="tooltip" data-html="true" title="Axis: X, Rotation: 180">
	    <span>P<sub>x</sub></span>
    </button>
`;

test("context-basic", () => {
    expect(
        true
    ).toBe(true);
});
