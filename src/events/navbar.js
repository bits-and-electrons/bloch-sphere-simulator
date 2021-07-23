import {
    GlobalContext
} from "./../context.js";

import {
    QuantumGate
} from "./../quantum/quantum_gate.js";

import {
    ToolboxEventsNamespace
} from "./toolbox.js";


var NavbarEventsNamespace = {
    saveWorkspace: function() {
        let workspaceProperties = {
            "blochSphereStateProperties": GlobalContext.blochSphereStateProperties,
            "customGatesProperties": GlobalContext.customGatesProperties,
            "lambdaGatesProperties": GlobalContext.lambdaGatesProperties
        };
    
        // stringfy workspace properies & update url hash
        window.location.hash = JSON.stringify(workspaceProperties);
    
        // update workspace
        NavbarEventsNamespace.updateWorkspace(false);
    },
    
    loadWorkspace: function() {
        // decode hash with unsafe url characters
        let hash = decodeURI(window.location.hash);
    
        if (hash.length == 0) {
            return;
        }
    
        // remove '#' from hash & parse workspace properties
        let workspacePropertiesJson = hash.substring(1);
        let workspaceProperties = JSON.parse(workspacePropertiesJson);
    
        // load blochsphere state properties
        if (workspaceProperties.blochSphereStateProperties != null) {
            GlobalContext.blochSphereStateProperties = workspaceProperties.blochSphereStateProperties;
        }
    
        // load custom gates properties
        if (workspaceProperties.customGatesProperties != null) {
            for (const [_, customGate] of Object.entries(workspaceProperties.customGatesProperties)) {
                ToolboxEventsNamespace.createCustomQuantumGate(QuantumGate.createQuantumGateUsingJsonString(customGate));
            }
        }
    
        // get lambda gates properties
        GlobalContext.lambdaGatesProperties = workspaceProperties.lambdaGatesProperties;
    
        // load polar lambda gates properties
        $("#polar-angle").val(workspaceProperties.lambdaGatesProperties.polarAngle);
        $("#polar-angle-content").html(`${workspaceProperties.lambdaGatesProperties.polarAngle}<span>&#176;</span>`);
    
        // load azimuth lambda gates properties
        $("#azimuth-angle").val(workspaceProperties.lambdaGatesProperties.azimuthAngle);
        $("#azimuth-angle-content").html(`${workspaceProperties.lambdaGatesProperties.azimuthAngle}<span>&#176;</span>`);
    },
    
    updateWorkspace: function(encoded) {
        let href = window.location.href;
    
        // decode href with unsafe url characters
        if (!encoded) {
            href = decodeURI(href);
        }
    
        // update workspace
        $("#export-workspace-textarea").val(href);
    },

    exportWorkspaceButtonOnClickEvent: function() {
        $("#export-workspace-textarea").select();
        document.execCommand("copy");
    },
    
    exportWorkspaceEncodeURLCheckboxOnChangeEvent: function() {
        if ($("#export-workspace-encode-url").is(':checked')) {
            NavbarEventsNamespace.updateWorkspace(true);
        }
        else {
            NavbarEventsNamespace.updateWorkspace(false);
        }
    },
    
    resetExportWorkspaceModel: function() {
        // reset encode url checkbox
        $("#export-workspace-encode-url").prop('checked', false);

        // reset export workspace textarea
        NavbarEventsNamespace.updateWorkspace(false);
    },
    
    startNavbarEventListeners: function() {
        $("#export-workspace").click(function () {
            NavbarEventsNamespace.exportWorkspaceButtonOnClickEvent();
        });
    
        $("#export-workspace-encode-url").change(function () {
            NavbarEventsNamespace.exportWorkspaceEncodeURLCheckboxOnChangeEvent();
        });
    
        $('#export-workspace-modal').on('hidden.bs.modal', function () {
            NavbarEventsNamespace.resetExportWorkspaceModel();
        });
    }
}


export {
    NavbarEventsNamespace
}
