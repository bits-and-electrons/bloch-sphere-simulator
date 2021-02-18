import {
    QuantumGate
} from "./quantum/quantum_gate.js"

import { 
    ToolboxEventListeners
} from "./event_listeners.js";

import {
    GlobalContext
} from "./context.js";


var ToolboxEvents = {
    enableQuantumGates: function () {
        $("button[id$='gate']").attr("disabled", false);
    },

    disableQuantumGates: function () {
        $("button[id$='gate']").attr("disabled", true);
    },

    createCustomGate: function (x, y, z, rotation) {
        let count = Object.keys(GlobalContext.customQuantumGates).length + 1;
        let id = "c" + count + "-custom-gate";

        let customGate = new QuantumGate(x, y, z, rotation);
        GlobalContext.customQuantumGates[id] = customGate;

        let customGateHtml = `
            <button type="button" id="${id}" class="col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
                data-toggle="tooltip" data-html="true" title="Axis: ${x} * X + ${y} * Y + ${z} * Z, Rotation: ${rotation}">
                <span>C<sub>${count}</sub></span>
            </button>
        `;

        $(customGateHtml).insertBefore("#custom-gate-add");

        ToolboxEventListeners.quantumGateEventListener(
            $.find("#" + id), GlobalContext.customQuantumGates[id]
        );
    },

    resetCustomGateModel: function () {
        $("#custom-gate-x").val("");
        $("#custom-gate-y").val("");
        $("#custom-gate-z").val("");
        $("#custom-gate-rotation").val("");

        $("#custom-gates-form").removeClass("was-validated");
    }
};

var BlochSphereStateEvents = {
    updateBlochSphereState: function () {
        // Get Current QuantumState
        let quantumState = GlobalContext.blochSphere.quantumState;

        // Update Theta & Phi
        $("#bloch-sphere-state-theta").html(quantumState.theta.toFixed(4));
        $("#bloch-sphere-state-phi").html(quantumState.phi.toFixed(4));

        // Update Alpha & Beta
        $("#bloch-sphere-state-alpha").html(quantumState.alpha.toFixed(4));
        $("#bloch-sphere-state-beta").html(quantumState.beta.toFixed(4));

        // Update X, Y & Z
        $("#bloch-sphere-state-x").html(quantumState.x.toFixed(4));
        $("#bloch-sphere-state-y").html(quantumState.y.toFixed(4));
        $("#bloch-sphere-state-z").html(quantumState.z.toFixed(4));
    }
};

export {
    ToolboxEvents,
    BlochSphereStateEvents
};
