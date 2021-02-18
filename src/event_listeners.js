import {
    QuantumGate
} from "./quantum/quantum_gate.js"

import {
    ToolboxEvents
} from "./events.js";

import {
    GlobalContext
} from "./context.js";


var ToolboxEventListeners = {
    quantumGateEventListener: function (element, gate) {
        $(element).click(function () {
            GlobalContext.startBlochSphereOperation(gate);
        });
    },

    builtInQuantumGatesEventListeners: function () {
        $.each($("button[id$='builtin-gate']"), function (_, element) {
            ToolboxEventListeners.quantumGateEventListener(
                element, GlobalContext.builtInQuantumGates[element.id]
            );
        });
    },

    customQuantumGatesEventListeners: function () {
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

                // Reset Custom Gate Model 
                ToolboxEvents.resetCustomGateModel();
            }
        });

        $('#custom-gate-modal').on('hidden.bs.modal', function () {
            // Reset Custom Gate Model 
            ToolboxEvents.resetCustomGateModel();
        });
    },

    lambdaQuantumGatesEventListeners: function () {
        $("#polar-angle").on("input change", function () {
            let polarAngle = $("#polar-angle").val();

            // Update Content
            $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);
        });

        $("#azimuth-angle").on("input change", function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Update Content
            $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);
        });

        $("#polar-lambda-gate").click(function () {
            let polarAngle = $("#polar-angle").val();

            // Apply Polar Lambda Gate
            GlobalContext.startBlochSphereOperation(new QuantumGate(0, 1, 0, polarAngle));
        });

        $("#azimuth-lambda-gate").click(function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Apply Azimuth Lambda Gate
            GlobalContext.startBlochSphereOperation(new QuantumGate(0, 0, 1, azimuthAngle));
        });
    },

    startAllEventListeners: function () {
        ToolboxEventListeners.builtInQuantumGatesEventListeners();
        ToolboxEventListeners.customQuantumGatesEventListeners();
        ToolboxEventListeners.lambdaQuantumGatesEventListeners();
    }
};

export {
    ToolboxEventListeners
};
