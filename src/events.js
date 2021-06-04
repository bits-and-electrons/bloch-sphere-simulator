import {
    QuantumGate
} from "./quantum/quantum_gate.js";

import {
    GlobalContext
} from "./context.js";

import { 
    Complex 
} from "./mathutils.js";


var NavbarEvents = {
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
                ToolboxEvents.createCustomGateUsingRotations(customGate.axis.x, customGate.axis.y, customGate.axis.z, customGate.rotation);
            }
        }

        // Load Lambda gates properties
        GlobalContext.lambdaGatesProperties = workspaceProperties.lambdaGatesProperties;

        $("#polar-angle").val(workspaceProperties.lambdaGatesProperties.polarAngle);
        $("#polar-angle-content").html(`${workspaceProperties.lambdaGatesProperties.polarAngle}<span>&#176;</span>`);

        $("#azimuth-angle").val(workspaceProperties.lambdaGatesProperties.azimuthAngle);
        $("#azimuth-angle-content").html(`${workspaceProperties.lambdaGatesProperties.azimuthAngle}<span>&#176;</span>`);
    },

    updateWorkspace: function (decoded) {
        let location = window.location;

        // Decode Location with unsafe URL characters
        if (decoded) {
            location = decodeURIComponent(location);
        }

        // Update Workspace
        $("#export-workspace-textarea").val(location);
    },

    resetExportWorkspaceModel: function () {
        $("#export-workspace-encode-url").prop('checked', false);
    },

    eventListeners: function () {
        $("#export-workspace").click(function () {
            $("#export-workspace-textarea").select();
            document.execCommand("copy");
        });

        $("#export-workspace-encode-url").change(function () {
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
    }
};

var ToolboxEvents = {
    enableQuantumGates: function () {
        $("button[id$='Gate']").attr("disabled", false);
    },

    disableQuantumGates: function () {
        $("button[id$='Gate']").attr("disabled", true);
    },

    createCustomGateUsingRotations: function (x, y, z, rotation, title=null) {
        x = parseInt(x);
        y = parseInt(y);
        z = parseInt(z);
        rotation = parseInt(rotation);

        let count = Object.keys(GlobalContext.customGatesProperties).length + 1;
        let id = "c" + count + "-customGate";

        let customGate = new QuantumGate(x, y, z, rotation);
        GlobalContext.customGatesProperties[id] = customGate;

        if (title == null) {
            title = `Axis: ${x} * X + ${y} * Y + ${z} * Z, Rotation: ${rotation}`
        }

        let customGateHtml = `
            <button type="button" id="${id}" class="quantum-gate col-xl-3 col-lg-12 btn btn-primary btn-custom mr-1 mt-1"
                data-toggle="tooltip" data-html="true" title="${title}">
                <span>C<sub>${count}</sub></span>
            </button>
        `;

        $(customGateHtml).insertBefore("#custom-gate-add");
    },

    createCustomGateUsingMatrix: function (a11Real, a11Img, a12Real, a12Img, a21Real, a21Img, a22Real, a22Img) {
        a11Real = parseInt(a11Real);
        a11Img = parseInt(a11Img);
        a12Real = parseInt(a12Real);
        a12Img = parseInt(a12Img);
        a21Real = parseInt(a21Real);
        a21Img = parseInt(a21Img);
        a22Real = parseInt(a22Real);
        a22Img = parseInt(a22Img);

        let a11 = new Complex(a11Real, a11Img);
        let a12 = new Complex(a12Real, a12Img);
        let a21 = new Complex(a21Real, a21Img);
        let a22 = new Complex(a22Real, a22Img);

        let title = `[[${a11.real} + i ${a11.img}, ${a12.real} + i ${a12.img}], [${a21.real} + i ${a21.img}, ${a22.real} + i ${a22.img}]]`

        ToolboxEvents.createCustomGateUsingRotations(1, 0, 1, 180, title)
    },

    resetCustomGateModel: function () {
        // Reset custom gate using rotations form
        $("#using-rotations-custom-gate-x").val("");
        $("#using-rotations-custom-gate-y").val("");
        $("#using-rotations-custom-gate-z").val("");
        $("#using-rotations-custom-gate-rotation").val("");
        $("#using-rotations-custom-gates-form").removeClass("was-validated");

        // Reset custom gate using matrix form
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

    eventListeners: function () {
        $("button[id$='builtInGate']").click(function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.builtInGatesProperties[$(this).attr("id")]);
        });

        $("#custom-gate-create").click(function () {
            if ($("#using-rotations-tab").hasClass("active")) {
                if (!($("#using-rotations-custom-gates-form")[0].checkValidity())) {
                    $("#using-rotations-custom-gates-form").addClass("was-validated");
                }
                else {
                    // Get Custom gate properties
                    let x = $("#using-rotations-custom-gate-x").val();
                    let y = $("#using-rotations-custom-gate-y").val();
                    let z = $("#using-rotations-custom-gate-z").val();
                    let rotation = $("#using-rotations-custom-gate-rotation").val();

                    // Create Custom gate
                    ToolboxEvents.createCustomGateUsingRotations(x, y, z, rotation);

                    // Reset custom Quantum gate model 
                    ToolboxEvents.resetCustomGateModel();

                    // Save Workspace
                    NavbarEvents.saveWorkspace();
                }
            }
            else {
                if (!($("#using-matrix-custom-gates-form")[0].checkValidity())) {
                    $("#using-matrix-custom-gates-form").addClass("was-validated");
                }
                else {
                    // Get Custom gate properties
                    let a11Real = $("#using-matrix-custom-gate-a11-real").val();
                    let a11Img = $("#using-matrix-custom-gate-a11-img").val();
                    let a12Real = $("#using-matrix-custom-gate-a12-real").val();
                    let a12Img = $("#using-matrix-custom-gate-a12-img").val();
                    let a21Real = $("#using-matrix-custom-gate-a21-real").val();
                    let a21Img = $("#using-matrix-custom-gate-a21-img").val();
                    let a22Real = $("#using-matrix-custom-gate-a22-real").val();
                    let a22Img = $("#using-matrix-custom-gate-a22-img").val();

                    // Create Custom gate
                    ToolboxEvents.createCustomGateUsingMatrix(a11Real, a11Img, a12Real, a12Img, a21Real, a21Img, a22Real, a22Img);

                    // Reset custom Quantum gate model 
                    ToolboxEvents.resetCustomGateModel();

                    // Save Workspace
                    NavbarEvents.saveWorkspace();
                }
            }
        });

        $('#custom-gate-modal').on('hidden.bs.modal', function () {
            // Reset custom Quantum gate model 
            ToolboxEvents.resetCustomGateModel();
        });

        $("#custom-gates-section").on("click", ".quantum-gate", function () {
            GlobalContext.startBlochSphereOperation(GlobalContext.customGatesProperties[$(this).attr("id")]);
        });

        $("#polar-angle").on("input change", function () {
            let polarAngle = $("#polar-angle").val();

            // Update content
            $("#polar-angle-content").html(`${polarAngle}<span>&#176;</span>`);

            // Save PolarAngle
            GlobalContext.lambdaGatesProperties.polarAngle = polarAngle;

            // Save Workspace
            NavbarEvents.saveWorkspace();
        });

        $("#azimuth-angle").on("input change", function () {
            let azimuthAngle = $("#azimuth-angle").val();

            // Update content
            $("#azimuth-angle-content").html(`${azimuthAngle}<span>&#176;</span>`);

            // Save AzimuthAngle
            GlobalContext.lambdaGatesProperties.azimuthAngle = azimuthAngle;

            // Save Workspace
            NavbarEvents.saveWorkspace();
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

export {
    NavbarEvents,
    ToolboxEvents, BlochSphereStateEvents
};
