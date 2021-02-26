import * as THREE from '../libs/three/three.module.js';


class BaseMesh extends THREE.Mesh {
    constructor(geometry, meterial, properties) {
        if (!properties) properties = {};

        if (!properties.position) properties.position = new THREE.Vector3();
        if (!properties.rotation) properties.rotation = new THREE.Vector3();

        super(geometry, meterial);

        this.position.x = properties.position.x;
        this.position.y = properties.position.y;
        this.position.z = properties.position.z;

        this.rotation.x = properties.rotation.x;
        this.rotation.y = properties.rotation.y;
        this.rotation.z = properties.rotation.z;
    }

    getColor() {
        return this.material.color;
    }

    getOpacity() {
        return this.material.opacity;
    }

    getParameters() {
        return this.geometry.parameters;
    }

    posX() {
        return this.position.x;
    }

    posY() {
        return this.position.y;
    }

    posZ() {
        return this.position.z;
    }

    rotX() {
        return this.rotation.x;
    }

    rotY() {
        return this.rotation.y;
    }

    rotZ() {
        return this.rotation.z;
    }
}

class BaseGroup extends THREE.Group {
    constructor(properties) {
        if (!properties) properties = {};

        if (!properties.position) properties.position = new THREE.Vector3();
        if (!properties.rotation) properties.rotation = new THREE.Vector3();

        super();

        this.position.x = properties.position.x;
        this.position.y = properties.position.y;
        this.position.z = properties.position.z;

        this.rotation.x = properties.rotation.x;
        this.rotation.y = properties.rotation.y;
        this.rotation.z = properties.rotation.z;
    }

    posX() {
        return this.position.x;
    }

    posY() {
        return this.position.y;
    }

    posZ() {
        return this.position.z;
    }

    rotX() {
        return this.rotation.x;
    }

    rotY() {
        return this.rotation.y;
    }

    rotZ() {
        return this.rotation.z;
    }
}

export {
    BaseMesh,
    BaseGroup
}
