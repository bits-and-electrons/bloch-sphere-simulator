import {
    GlobalContext
} from "./../context.js";

import {
    ToolboxEventsNamespace
} from "./toolbox.js";

import { 
    NavbarEventsNamespace 
} from "./navbar.js";


var BlochSphereEventsNamespace = {
    updateBlochSphereState: function() {
        // get blochsphere state
        let blochSphereState = GlobalContext.blochSphere.blochSphereState;
    
        // update theta & phi
        $("#bloch-sphere-state-theta").html(blochSphereState.theta.toString());
        $("#bloch-sphere-state-phi").html(blochSphereState.phi.toString());
    
        // update alpha & beta
        $("#bloch-sphere-state-alpha").html(blochSphereState.alpha.toString());
        $("#bloch-sphere-state-beta").html(blochSphereState.beta.toString());
    
        // update x, y & z
        $("#bloch-sphere-state-x").html(blochSphereState.x.toString());
        $("#bloch-sphere-state-y").html(blochSphereState.y.toString());
        $("#bloch-sphere-state-z").html(blochSphereState.z.toString());
    },
    
    blochSphereOperation: function() {
        if (GlobalContext.blochSphereOperation.inProgress) {
            if (GlobalContext.blochSphereOperation.rotation == 0) {
                GlobalContext.blochSphereOperation.inProgress = false;
    
                // get blochSphere state
                let blochSphereState = GlobalContext.blochSphere.blochSphereState;
    
                // save theta & phi
                GlobalContext.blochSphereStateProperties.theta = blochSphereState.theta;
                GlobalContext.blochSphereStateProperties.phi = blochSphereState.phi;

                // diable quantum gates
                ToolboxEventsNamespace.enableQuantumGates();
    
                // save workspace
                NavbarEventsNamespace.saveWorkspace();
            }
            else {
                if (GlobalContext.blochSphereOperation.rotation > 0) {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation -= 1;
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(1));
                }
                else {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation += 1;
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(-1));
                }
    
                // update blochsphere state
                BlochSphereEventsNamespace.updateBlochSphereState();
            }
        }
    },
    
    startBlochSphereOperation: function(gate) {
        ToolboxEventsNamespace.disableQuantumGates();
    
        GlobalContext.blochSphereOperation.inProgress = true;
    
        GlobalContext.blochSphereOperation.rotationAxis = gate.rotationAxis;
        GlobalContext.blochSphereOperation.rotation = gate.rotation
    }
}


export {
    BlochSphereEventsNamespace
}
