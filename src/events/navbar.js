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
        NavbarEventsNamespace.updateWorkspace(true);
    },
    
    loadWorkspace: function() {
        // decode Hash with unsafe URL characters
        let hash = decodeURIComponent(window.location.hash);
    
        if (hash.length == 0) {
            return;
        }
    
        // remove '#' from hash & Parse workspace properties
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
    
    updateWorkspace: function(decoded) {
        let location = window.location;
    
        // decode location with unsafe url characters
        if (decoded) {
            location = decodeURIComponent(location);
        }
    
        // update workspace
        $("#export-workspace-textarea").val(location);
    },

    exportWorkspaceButtonOnClickEvent: function() {
        $("#export-workspace-textarea").select();
        document.execCommand("copy");
    },
    
    exportWorkspaceEncodeURLCheckboxOnChangeEvent: function() {
        if ($(this).is(':checked')) {
            NavbarEventsNamespace.updateWorkspace(false);
        }
        else {
            NavbarEventsNamespace.updateWorkspace(true);
        }
    },
    
    resetExportWorkspaceModel: function() {
        $("#export-workspace-encode-url").prop('checked', false);
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
