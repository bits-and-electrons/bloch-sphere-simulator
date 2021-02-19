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
        let count = Object.keys(GlobalContext.customGates).length + 1;
        let id = "c" + count + "-customGate";

        let customGate = new QuantumGate(x, y, z, rotation);
        GlobalContext.customGates[id] = customGate;

        let customGateHtml = `
            <button type="button" id="${id}" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-sharp mr-1 mt-1"
                data-toggle="tooltip" data-html="true" title="Axis: ${x} * X + ${y} * Y + ${z} * Z, Rotation: ${rotation}">
                <span>C<sub>${count}</sub></span>
            </button>
        `;

        $(customGateHtml).insertBefore("#custom-gate-add");
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

var ExportWorkspaceEvents = {
    saveWorkspace: function () {
        let workspaceProperties = {
            "blochSphereState": GlobalContext.blochSphereState,
            "customGates": GlobalContext.customGates,
            "lambdaGates": GlobalContext.lambdaGates
        };

        window.location.hash = JSON.stringify(workspaceProperties);

        // Update HREF in Export Workspace InputField
        $("#export-workspace-input").val(window.location.href);
    },

    loadWorkspace: function () {
        // Decode unsafe URL characters
        let hash = decodeURIComponent(window.location.hash);

        if (hash.length == 0) {
            return;
        }

        // Remove char '#' from hash & Parse
        let workspacePropertiesJson = hash.substring(1);
        let workspaceProperties = JSON.parse(workspacePropertiesJson);

        // Load BlochSphere State
        if (workspaceProperties.blochSphereState != null) {
            GlobalContext.blochSphereState = workspaceProperties.blochSphereState;
        }

        // Load Custom Gates
        if (workspaceProperties.customGates != null) {
            for (const [_, customGate] of Object.entries(workspaceProperties.customGates)) {
                ToolboxEvents.createCustomGate(customGate.axis.x, customGate.axis.y, customGate.axis.z, customGate.rotation);
            }
        }

        // Load Polar Angle
        $("#polar-angle").val(workspaceProperties.lambdaGates.polarAngle);
        $("#polar-angle-content").html(`${workspaceProperties.lambdaGates.polarAngle}<span>&#176;</span>`);

        // Load Azimuth Angle
        $("#azimuth-angle").val(workspaceProperties.lambdaGates.azimuthAngle);
        $("#azimuth-angle-content").html(`${workspaceProperties.lambdaGates.azimuthAngle}<span>&#176;</span>`);
    }
};

export {
    ToolboxEvents, BlochSphereStateEvents,
    ExportWorkspaceEvents
};
