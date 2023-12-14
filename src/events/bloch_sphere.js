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
                // set inProgress flag to false
                GlobalContext.blochSphereOperation.inProgress = false;
    
                // get blochSphere state
                let blochSphereState = GlobalContext.blochSphere.blochSphereState;
    
                // save theta & phi
                GlobalContext.blochSphereStateProperties.theta = blochSphereState.theta;
                GlobalContext.blochSphereStateProperties.phi = blochSphereState.phi;

                // enable quantum gates
                ToolboxEventsNamespace.enableQuantumGates();
    
                // save workspace
                NavbarEventsNamespace.saveWorkspace();
            } else if (GlobalContext.blochSphereOperation.rotation <= 1 && GlobalContext.blochSphereOperation.rotation >= -1) {
                // Take smaller steps
                if (GlobalContext.blochSphereOperation.rotation > 0) {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation = new Decimal(GlobalContext.blochSphereOperation.rotation).minus(0.01).toDecimalPlaces(4).toNumber();
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(0.01));
                }
                else {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation = new Decimal(GlobalContext.blochSphereOperation.rotation).plus(0.01).toDecimalPlaces(4).toNumber();
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(-0.01));
                }
            } else {
                if (GlobalContext.blochSphereOperation.rotation > 0) {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation = new Decimal(GlobalContext.blochSphereOperation.rotation).minus(1).toDecimalPlaces(4).toNumber();
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(1));
                }
                else {
                    // apply delta quantum operation
                    GlobalContext.blochSphereOperation.rotation = new Decimal(GlobalContext.blochSphereOperation.rotation).plus(1).toDecimalPlaces(4).toNumber();
                    GlobalContext.blochSphere.updateBlochSphereState(GlobalContext.blochSphereOperation.rotationAxis, THREE.Math.degToRad(-1));
                }
    
                // update blochsphere state
                BlochSphereEventsNamespace.updateBlochSphereState();
            }
        }
    },
    
    startBlochSphereOperation: function(gate) {
        console.log(`startBlochSphereOperation(${JSON.stringify(gate)})`);
        // disable quantum gates
        ToolboxEventsNamespace.disableQuantumGates();
    
        // set inProgress flag to true
        GlobalContext.blochSphereOperation.inProgress = true;
    
        // set rotationAxis and rotation
        GlobalContext.blochSphereOperation.rotationAxis = gate.rotationAxis;
        GlobalContext.blochSphereOperation.rotation = gate.rotation
    }
}

export {
    BlochSphereEventsNamespace
}
