import {
    QuantumGate
} from "./quantum/quantum_gate.js"

import {
    GlobalContext
} from "./context.js";

import {
    PRECISION
} from "./constants.js"


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
        // Get BlochSphereState
        let blochSphereState = GlobalContext.blochSphere.blochSphereState;

        // Update Theta & Phi
        $("#bloch-sphere-state-theta").html(blochSphereState.theta.toFixed(PRECISION));
        $("#bloch-sphere-state-phi").html(blochSphereState.phi.toFixed(PRECISION));

        // Update Alpha & Beta
        $("#bloch-sphere-state-alpha").html(blochSphereState.alpha.toFixed(PRECISION));
        $("#bloch-sphere-state-beta").html(blochSphereState.beta.toFixed(PRECISION));

        // Update X, Y & Z
        $("#bloch-sphere-state-x").html(blochSphereState.x.toFixed(PRECISION));
        $("#bloch-sphere-state-y").html(blochSphereState.y.toFixed(PRECISION));
        $("#bloch-sphere-state-z").html(blochSphereState.z.toFixed(PRECISION));
    }
};

var ExportWorkspaceEvents = {
    saveWorkspace: function () {
        let workspaceProperties = {
            "blochSphereState": GlobalContext.blochSphereState,
            "customGates": GlobalContext.customGates,
            "lambdaGates": GlobalContext.lambdaGates
        };

        // Stringfy Workspace Properies
        let workspacePropertiesJson = JSON.stringify(workspaceProperties);

        // Update URL Hash
        window.location.hash = workspacePropertiesJson;

        // Update Workspace URL
        ExportWorkspaceEvents.updateWorkspaceURL(true);
    },

    loadWorkspace: function () {
        // Decode Hash with Unsafe URL Characters
        let hash = decodeURIComponent(window.location.hash);

        if (hash.length == 0) {
            return;
        }

        // Remove '#' Hrom hash & Parse Workspace Properties
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

        // Load Lambda Gates
        GlobalContext.lambdaGates = workspaceProperties.lambdaGates;

        $("#polar-angle").val(workspaceProperties.lambdaGates.polarAngle);
        $("#polar-angle-content").html(`${workspaceProperties.lambdaGates.polarAngle}<span>&#176;</span>`);

        $("#azimuth-angle").val(workspaceProperties.lambdaGates.azimuthAngle);
        $("#azimuth-angle-content").html(`${workspaceProperties.lambdaGates.azimuthAngle}<span>&#176;</span>`);
    },

    updateWorkspaceURL: function (decoded) {
        let location = window.location;

        if (decoded)
        {
            // Decode Location with Unsafe URL Characters
            location = decodeURIComponent(location);
        }

        // Update Export Workspace
        $("#export-workspace-textarea").val(location);
    },

    copyWorkspaceToClipboard: function () {
        $("#export-workspace-textarea").select();
        document.execCommand("copy");
    },

    resetExportWorkspaceModel: function () {
        $("#export-workspace-encode-url").prop('checked', false);
    }
};

export {
    ToolboxEvents, BlochSphereStateEvents,
    ExportWorkspaceEvents
};
