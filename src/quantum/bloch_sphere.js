import {
    BaseGroup
} from "../geometry/bases.js";

import {
    Sphere
} from "../geometry/basic_shapes.js";

import {
    CartesianAxes, StatePointer
} from "../geometry/composite_shapes.js";

import {
    QuantumState
} from "./quantum_state.js"

class BlochSphere extends BaseGroup {
    constructor(radius, properties) {
        if (!properties) properties = {};

        if (!properties.color) properties.color = 0xFFFFFF;
        if (!properties.opacity) properties.opacity = 0.8;

        if (!properties.axesLength) properties.axesLength = radius + (radius * 0.1);
        if (!properties.axesWidth) properties.axesWidth = 1;

        super(properties);

        // Create Sphere
        this.sphere = new Sphere(radius, {
            color: properties.color,
            opacity: properties.opacity,
            skeleton: true,
            skeletonColor: 0x808080
        });

        // Add Sphere to BaseGroup
        this.add(this.sphere);

        // Create CartesianAxes
        this.cartesianAxes = new CartesianAxes(properties.axesLength, properties.axesWidth);

        // Add CartesianAxes to BaseGroup
        this.add(this.cartesianAxes);

        // Create StatePointer
        this.statePointer = new StatePointer(radius, 3, {
            color: 0x000000,
            position: new THREE.Vector3(0, radius / 2, 0)
        });

        // Add StatePointer to BaseGroup
        this.add(this.statePointer);

        // Create QuantumState
        this.quantumState = new QuantumState(this.statePointer.theta(), this.statePointer.phi());
    }

    updateQuantumState(axis, angle) {
        this.statePointer.rotate(axis, new THREE.Vector3(), angle);

        // Update QuantumState
        this.quantumState.update(this.statePointer.theta(), this.statePointer.phi());
    }
}

export {
    BlochSphere
};