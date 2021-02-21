import * as THREE from '../libs/three/three.module.js';

import {
    BaseMesh
} from "./bases.js";


class Cylinder extends BaseMesh {
    constructor(height, radiusTop, radiusBottom, properties) {
        if (!properties) properties = {};

        if (!properties.color) properties.color = 0xFFFFFF;

        if (!properties.radialSegments) properties.radialSegments = 64;
        if (!properties.heightSegments) properties.heightSegments = 64;

        let cylinderGeometry = new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            properties.radialSegments,
            properties.heightSegments
        );

        let cylinderMaterial = new THREE.MeshPhongMaterial({
            color: properties.color
        });

        super(cylinderGeometry, cylinderMaterial, properties);
    }
}

class Sphere extends BaseMesh {
    constructor(radius, properties) {
        if (!properties) properties = {};

        if (!properties.color) properties.color = 0xFFFFFF;
        if (!properties.opacity) properties.opacity = 1.0;

        if (!properties.widthSegments) properties.widthSegments = 36;
        if (!properties.heightSegments) properties.heightSegments = 36;

        if (!properties.phiStart) properties.phiStart = 0;
        if (!properties.phiLength) properties.phiLength = Math.PI * 2;

        if (!properties.thetaStart) properties.thetaStart = 0;
        if (!properties.thetaLength) properties.thetaLength = Math.PI;

        if (!properties.skeleton) properties.skeleton = false;
        if (!properties.skeletonColor) properties.skeletonColor = 0xFFFFFF;
        if (!properties.skeletonWidth) properties.skeletonWidth = 1;

        let sphereGeometry = new THREE.SphereGeometry(
            radius,
            properties.widthSegments,
            properties.heightSegments,
            properties.phiStart,
            properties.phiLength,
            properties.thetaStart,
            properties.thetaLength
        );

        let sphereMaterial = new THREE.MeshPhongMaterial({
            color: properties.color,
            opacity: properties.opacity
        });

        sphereMaterial.transparent = true;
        sphereMaterial.side = THREE.DoubleSide;

        let lineSegments = null;

        if (properties.skeleton) {
            sphereMaterial.polygonOffset = true;
            sphereMaterial.polygonOffsetFactor = 1;
            sphereMaterial.polygonOffsetUnits = 1;

            let lineSegmentsGeometry = new THREE.EdgesGeometry(sphereGeometry);

            let lineSegmentsMaterial = new THREE.LineBasicMaterial({
                color: properties.skeletonColor,
                linewidth: properties.skeletonWidth
            });

            lineSegments = new THREE.LineSegments(lineSegmentsGeometry, lineSegmentsMaterial);
        }

        super(sphereGeometry, sphereMaterial, properties);

        if (properties.skeleton) {
            this.add(lineSegments);
        }
    }
}

export {
    Cylinder, Sphere
};
