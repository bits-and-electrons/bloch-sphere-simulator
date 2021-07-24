import {
    GlobalContext
} from "./../context.js";

import {
    Complex
} from "./../math/complex.js";

import {
    QuantumGate
} from "./../quantum/quantum_gate.js";

import {
    BlochSphereEventsNamespace
} from "./bloch_sphere.js";

import {
    NavbarEventsNamespace
} from "./navbar.js";


var ToolboxEventsNamespace = {
    enableQuantumGates: function() {
        $("button[id$='Gate']").attr("disabled", false);
    },
    
    disableQuantumGates: function() {
        $("button[id$='Gate']").attr("disabled", true);
    },
    
    createCustomQuantumGate: function(customQuantumGate) {
        let count = Object.keys(GlobalContext.customGatesProperties).length + 1;
        let id = "c" + count + "-customGate";
    
        GlobalContext.customGatesProperties[id] = customQuantumGate;
    
        let customQuantumGateHtml = `
            <button type="button" id="${id}" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-custom mr-1 mt-1"
                data-toggle="tooltip" data-html="true" title="${customQuantumGate.properties.title}">
                <span>C<sub>${count}</sub></span>
            </button>
        `;
    
        $(customQuantumGateHtml).insertBefore("#custom-gate-add");
    },
    
    createCustomQuantumGateUsingRotations: function(x, y, z, rotation) {
        let customQuantumGate = QuantumGate.createQuantumGateUsingRotations(x, y, z, rotation);
        ToolboxEventsNamespace.createCustomQuantumGate(customQuantumGate);
    },
    
    createCustomQuantumGateUsingMatrix: function(a11, a12, a21, a22) {
        let customQuantumGate = QuantumGate.createQuantumGateUsingMatrix(a11, a12, a21, a22);
        ToolboxEventsNamespace.createCustomQuantumGate(customQuantumGate);
    },
    
    resetCustomQuantumGateModels: function() {
        // reset custom gate using rotations
        $("#using-rotations-custom-gate-x").val("");
        $("#using-rotations-custom-gate-y").val("");
        $("#using-rotations-custom-gate-z").val("");
        $("#using-rotations-custom-gate-rotation").val("");
        $("#using-rotations-custom-gates-form").removeClass("was-validated");
    
        // reset custom gate using matrix
        $("#using-matrix-custom-gate-a11-real").val("");
        $("#using-matrix-custom-gate-a11-img").val("");
        $("#using-matrix-custom-gate-a12-real").val("");
        $("#using-matrix-custom-gate-a12-img").val("");
        $("#using-matrix-custom-gate-a21-real").val("");
        $("#using-matrix-custom-gate-a21-img").val("");
        $("#using-matrix-custom-gate-a22-real").val("");
        $("#using-matrix-custom-gate-a22-img").val("");
        $("#using-matrix-custom-gates-form").removeClass("was-validated");
    },
    
    builtInGateButtonOnClickEvent: function(buildInGateButtonId) {
        BlochSphereEventsNamespace.startBlochSphereOperation(GlobalContext.builtInGatesProperties[buildInGateButtonId]);
    },
    
    customGateCreateButtonOnClickEvent: function() {
        if ($("#using-rotations-tab").hasClass("active")) {
            if (!($("#using-rotations-custom-gates-form")[0].checkValidity())) {
                $("#using-rotations-custom-gates-form").addClass("was-validated");
            }
            else {
                // get custom gate properties
                let x = $("#using-rotations-custom-gate-x").val();
                let y = $("#using-rotations-custom-gate-y").val();
                let z = $("#using-rotations-custom-gate-z").val();
                let rotation = $("#using-rotations-custom-gate-rotation").val();
    
                // create custom gate
                ToolboxEventsNamespace.createCustomQuantumGateUsingRotations(x, y, z, rotation);
    
                // reset custom quantum gate model 
                ToolboxEventsNamespace.resetCustomQuantumGateModels();
    
                // save workspace
                NavbarEventsNamespace.saveWorkspace();
            }
        }
        else {
            if (!($("#using-matrix-custom-gates-form")[0].checkValidity())) {
                $("#using-matrix-custom-gates-form").addClass("was-validated");
            }
            else {
                // get custom gate properties
                let a11 = new Complex($("#using-matrix-custom-gate-a11-real").val(), $("#using-matrix-custom-gate-a11-img").val());
                let a12 = new Complex($("#using-matrix-custom-gate-a12-real").val(), $("#using-matrix-custom-gate-a12-img").val());
                let a21 = new Complex($("#using-matrix-custom-gate-a21-real").val(), $("#using-matrix-custom-gate-a21-img").val());
                let a22 = new Complex($("#using-matrix-custom-gate-a22-real").val(), $("#using-matrix-custom-gate-a22-img").val());
    
                // create custom gate
                ToolboxEventsNamespace.createCustomQuantumGateUsingMatrix(a11, a12, a21, a22);
    
                // reset custom quantum gate model 
                ToolboxEventsNamespace.resetCustomQuantumGateModels();
    
                // save workspace
                NavbarEventsNamespace.saveWorkspace();
            }
        }
    },
    
    customGateOnClickEvent: function(customGateId) {
        BlochSphereEventsNamespace.startBlochSphereOperation(GlobalContext.customGatesProperties[customGateId]);
    },
    
    polarAngleOnInputChangeEvent: function() {
        let polarAngle = $("#polar-angle").val();
    
        // update html content
        $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);
    
        // save polar angle
        GlobalContext.lambdaGatesProperties.polarAngle = polarAngle;
    
        // save workspace
        NavbarEventsNamespace.saveWorkspace();
    },
    
    azimuthAngleOnInputChangeEvent: function() {
        let azimuthAngle = $("#azimuth-angle").val();
    
        // update html content
        $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);
    
        // save azimuth angle
        GlobalContext.lambdaGatesProperties.azimuthAngle = azimuthAngle;
    
        // save workspace
        NavbarEventsNamespace.saveWorkspace();
    },
    
    polarLambdaGateOnClickEvent: function() {
        let polarAngle = $("#polar-angle").val();
    
        // apply polar lambda gate
        BlochSphereEventsNamespace.startBlochSphereOperation(new QuantumGate(0, 1, 0, polarAngle));
    },
    
    azimuthLambdaGateOnClickEvent: function() {
        let azimuthAngle = $("#azimuth-angle").val();
    
        // apply azimuth lambda gate
        BlochSphereEventsNamespace.startBlochSphereOperation(new QuantumGate(0, 0, 1, azimuthAngle));
    },
    
    startToolboxEventListeners: function() {
        $("button[id$='builtInGate']").click(function () {
            ToolboxEventsNamespace.builtInGateButtonOnClickEvent($(this).attr("id"));
        });
    
        $("#custom-gate-create").click(function () {
            ToolboxEventsNamespace.customGateCreateButtonOnClickEvent();
        });
    
        $("#custom-gates-section").on("click", ".quantum-gate", function () {
            ToolboxEventsNamespace.customGateOnClickEvent($(this).attr("id"));
        });
    
        $("#polar-angle").on("input change", function () {
            ToolboxEventsNamespace.polarAngleOnInputChangeEvent();
        });
    
        $("#azimuth-angle").on("input change", function () {
            ToolboxEventsNamespace.azimuthAngleOnInputChangeEvent();
        });
    
        $("#polar-lambdaGate").click(function () {
            ToolboxEventsNamespace.polarLambdaGateOnClickEvent();
        });
    
        $("#azimuth-lambdaGate").click(function () {
            ToolboxEventsNamespace.azimuthLambdaGateOnClickEvent();
        });
    
        $('#custom-gate-modal').on('hidden.bs.modal', function () {
            ToolboxEventsNamespace.resetCustomQuantumGateModels();
        });
    }
}


export {
    ToolboxEventsNamespace
}
