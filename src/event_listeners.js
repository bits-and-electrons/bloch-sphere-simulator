import {
    QuantumGate
} from "./quantum/quantum_gate.js";

import {
    ToolboxEvents,
    NavbarEvents,
    WorkspaceEvents
} from "./events.js";

import {
    GlobalContext
} from "./context.js";



var ToolboxEventListeners = {
    builtInQuantumGatesEventListeners: function () {
        $("button[id$='builtInGate']").click(function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.builtInGatesProperties[$(this).attr("id")]);
        });
    },

    createCustomGateEventListeners: function () {
        $("#custom-gate-create").click(function () {
            if (!($("#custom-gates-form")[0].checkValidity())) {
                $("#custom-gates-form").addClass("was-validated");
            }
            else {
                // Get Custom gate properties
                let x = $("#custom-gate-x").val();
                let y = $("#custom-gate-y").val();
                let z = $("#custom-gate-z").val();
                let rotation = $("#custom-gate-rotation").val();

                // Create Custom gate
                ToolboxEvents.createCustomGate(x, y, z, rotation);

                // Reset custom Quantum gate model 
                ToolboxEvents.resetCustomGateModel();

                // Save Workspace
                WorkspaceEvents.saveWorkspace();
            }
        });

        $('#custom-gate-modal').on('hidden.bs.modal', function () {
            // Reset custom Quantum gate model 
            ToolboxEvents.resetCustomGateModel();
        });
    },

    customGatesEventListeners: function () {
        $("#custom-gates-section").on("click", ".quantum-gate", function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.customGatesProperties[$(this).attr("id")]);
        });
    },

    lambdaGatesEventListeners: function () {
        $("#polar-angle").on("input change", function () {
            let polarAngle = $("#polar-angle").val();

            // Update content
            $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);

            // Save PolarAngle
            GlobalContext.lambdaGatesProperties.polarAngle = polarAngle;

            // Save Workspace
            WorkspaceEvents.saveWorkspace();
        });

        $("#azimuth-angle").on("input change", function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Update content
            $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);

            // Save AzimuthAngle
            GlobalContext.lambdaGatesProperties.azimuthAngle = azimuthAngle;

            // Save Workspace
            WorkspaceEvents.saveWorkspace();
        });

        $("#polar-lambdaGate").click(function () {
            let polarAngle = $("#polar-angle").val();

            // Apply Polar Lambda gate
            GlobalContext.startBlochSphereOperation(new QuantumGate(0, 1, 0, polarAngle));
        });

        $("#azimuth-lambdaGate").click(function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Apply Azimuth Lambda gate
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

var NavbarEventListeners = {
    exportWorkspaceEventsListeners: function () {
        $("#export-workspace").click(function () {
            NavbarEvents.copyWorkspaceToClipboard();
        });

        $("#export-workspace-encode-url").change(function() {
            if ($(this).is(':checked')) {
                NavbarEvents.updateWorkspace(false);
            }
            else {
                NavbarEvents.updateWorkspace(true);
            }
        });

        $('#export-workspace-modal').on('hidden.bs.modal', function () {
            // Reset export workspace model
            NavbarEvents.resetExportWorkspaceModel();
        });
    },

    startAllEventListeners: function () {
        NavbarEventListeners.exportWorkspaceEventsListeners();
    }
}

export {
    ToolboxEventListeners,
    NavbarEventListeners
};
