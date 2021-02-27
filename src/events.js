import {
    QuantumGate
} from "./quantum/quantum_gate.js";

import {
    GlobalContext
} from "./context.js";


var ToolboxEvents = {
    enableQuantumGates: function () {
        $("button[id$='Gate']").attr("disabled", false);
    },

    disableQuantumGates: function () {
        $("button[id$='Gate']").attr("disabled", true);
    },

    createCustomGate: function (x, y, z, rotation) {
        x = parseInt(x);
        y = parseInt(y);
        z = parseInt(z);
        rotation = parseInt(rotation);

        let count = Object.keys(GlobalContext.customGatesProperties).length + 1;
        let id = "c" + count + "-customGate";

        let customGate = new QuantumGate(x, y, z, rotation);
        GlobalContext.customGatesProperties[id] = customGate;

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
        $("#bloch-sphere-state-theta").html(blochSphereState.theta.toString());
        $("#bloch-sphere-state-phi").html(blochSphereState.phi.toString());

        // Update Alpha & Beta
        $("#bloch-sphere-state-alpha").html(blochSphereState.alpha.toString());
        $("#bloch-sphere-state-beta").html(blochSphereState.beta.toString());

        // Update X, Y & Z
        $("#bloch-sphere-state-x").html(blochSphereState.x.toString());
        $("#bloch-sphere-state-y").html(blochSphereState.y.toString());
        $("#bloch-sphere-state-z").html(blochSphereState.z.toString());
    }
};

var NavbarEvents = {
    updateWorkspace: function (decoded) {
        let location = window.location;

        // Decode Location with unsafe URL characters
        if (decoded) {
            location = decodeURIComponent(location);
        }

        // Update Workspace
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

var WorkspaceEvents = {
    saveWorkspace: function () {
        let workspaceProperties = {
            "blochSphereStateProperties": GlobalContext.blochSphereStateProperties,
            "customGatesProperties": GlobalContext.customGatesProperties,
            "lambdaGatesProperties": GlobalContext.lambdaGatesProperties
        };

        // Stringfy Workspace properies
        let workspacePropertiesJson = JSON.stringify(workspaceProperties);

        // Update URL hash
        window.location.hash = workspacePropertiesJson;

        // Update Workspace
        NavbarEvents.updateWorkspace(true);
    },

    loadWorkspace: function () {
        // Decode Hash with unsafe URL characters
        let hash = decodeURIComponent(window.location.hash);

        if (hash.length == 0) {
            return;
        }

        // Remove '#' from hash & Parse workspace properties
        let workspacePropertiesJson = hash.substring(1);
        let workspaceProperties = JSON.parse(workspacePropertiesJson);

        // Load BlochSphereState properties
        if (workspaceProperties.blochSphereStateProperties != null) {
            GlobalContext.blochSphereStateProperties = workspaceProperties.blochSphereStateProperties;
        }

        // Load Custom gates properties
        if (workspaceProperties.customGatesProperties != null) {
            for (const [_, customGate] of Object.entries(workspaceProperties.customGatesProperties)) {
                ToolboxEvents.createCustomGate(customGate.axis.x, customGate.axis.y, customGate.axis.z, customGate.rotation);
            }
        }

        // Load Lambda gates properties
        GlobalContext.lambdaGatesProperties = workspaceProperties.lambdaGatesProperties;

        $("#polar-angle").val(workspaceProperties.lambdaGatesProperties.polarAngle);
        $("#polar-angle-content").html(`${workspaceProperties.lambdaGatesProperties.polarAngle}<span>&#176;</span>`);

        $("#azimuth-angle").val(workspaceProperties.lambdaGatesProperties.azimuthAngle);
        $("#azimuth-angle-content").html(`${workspaceProperties.lambdaGatesProperties.azimuthAngle}<span>&#176;</span>`);
    }
};

export {
    ToolboxEvents, BlochSphereStateEvents,
    NavbarEvents,
    WorkspaceEvents
};
