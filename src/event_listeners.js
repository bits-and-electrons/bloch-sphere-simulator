import {
    QuantumGate
} from "./quantum/quantum_gate.js"

import {
    ToolboxEvents,
    ExportWorkspaceEvents
} from "./events.js";

import {
    GlobalContext
} from "./context.js";


var ToolboxEventListeners = {
    builtInQuantumGatesEventListeners: function () {
        $("button[id$='builtInGate']").click(function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.builtInGates[$(this).attr("id")]);
        });
    },

    createCustomGateEventListeners: function () {
        $("#custom-gate-create").click(function () {
            if (!($("#custom-gates-form")[0].checkValidity())) {
                $("#custom-gates-form").addClass("was-validated");
            }
            else {
                // Get Custom Gate Properties
                let x = $("#custom-gate-x").val();
                let y = $("#custom-gate-y").val();
                let z = $("#custom-gate-z").val();
                let rotation = $("#custom-gate-rotation").val();

                // Create Custom Gate
                ToolboxEvents.createCustomGate(x, y, z, rotation);

                // Reset Custom Quantum Gate Model 
                ToolboxEvents.resetCustomGateModel();

                // Save Workspace
                ExportWorkspaceEvents.saveWorkspace();
            }
        });

        $('#custom-gate-modal').on('hidden.bs.modal', function () {
            // Reset Custom Quantum Gate Model 
            ToolboxEvents.resetCustomGateModel();
        });
    },

    customGatesEventListeners: function () {
        $("#custom-gates-section").on("click", ".quantum-gate", function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.customGates[$(this).attr("id")]);
        });
    },

    lambdaGatesEventListeners: function () {
        $("#polar-angle").on("input change", function () {
            let polarAngle = $("#polar-angle").val();

            // Update Content
            $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);

            // Save PolarAngle
            GlobalContext.lambdaGates.polarAngle = polarAngle;

            // Save Workspace
            ExportWorkspaceEvents.saveWorkspace();
        });

        $("#azimuth-angle").on("input change", function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Update Content
            $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);

            // Save AzimuthAngle
            GlobalContext.lambdaGates.azimuthAngle = azimuthAngle;

            // Save Workspace
            ExportWorkspaceEvents.saveWorkspace();
        });

        $("#polar-lambdaGate").click(function () {
            let polarAngle = $("#polar-angle").val();

            // Apply Polar Lambda Gate
            GlobalContext.startBlochSphereOperation(new QuantumGate(0, 1, 0, polarAngle));
        });

        $("#azimuth-lambdaGate").click(function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Apply Azimuth Lambda Gate
            GlobalContext.startBlochSphereOperation(new QuantumGate(0, 0, 1, azimuthAngle));
        });
    },

    startAllEventListeners: function () {
        ToolboxEventListeners.builtInQuantumGatesEventListeners();

        ToolboxEventListeners.createCustomGateEventListeners();
        ToolboxEventListeners.customGatesEventListeners();

        ToolboxEventListeners.lambdaGatesEventListeners();
    }
};

var ExportWorkspaceEventsListeners = {
    exportWorkspaceEventsListeners: function () {
        $("#export-workspace").click(function () {
            ExportWorkspaceEvents.copyWorkspaceToClipboard();
        });
    },

    startAllEventListeners: function () {
        ExportWorkspaceEventsListeners.exportWorkspaceEventsListeners();
    }
}

export {
    ToolboxEventListeners,
    ExportWorkspaceEventsListeners
};
