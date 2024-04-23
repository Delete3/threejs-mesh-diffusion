import * as THREE from 'three';
import Editor from '../../Editor';
import { getMouseCartesianPosition } from '../../tool/ThreejsMathTool';

const raycaster = new THREE.Raycaster()
const pointMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
const pointGeometry = new THREE.SphereGeometry(0.2, 32, 32);

class DrawLine {
    constructor() {
        this._isDrawingPoint = false;
        /**@type {THREE.Mesh[]} */
        this.pointArray = [];
    }

    get isDrawingPoint() {
        return this._isDrawingPoint
    }

    startDrawPoint = () => {
        Editor.container.addEventListener('mousedown', this.onDrawPointMouseDown);
        // Editor.container.addEventListener('mouseup', this.mouseup);
    }

    /**
     * @param {MouseEvent} event 
     */
    onDrawPointMouseDown = event => {
        event.preventDefault();
        if (event.button != 0) return;

        const mouse = getMouseCartesianPosition(event, Editor.container);
        raycaster.setFromCamera(mouse, Editor.control.camera);
        const intersects = raycaster.intersectObject(Editor.targetMesh, false);

        if (intersects.length == 0) return;

        const { point } = intersects[0];
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
        pointMesh.position.copy(point);
        
        this.pointArray.push(point);
        Editor.scene.add(pointMesh);
    }
}

export default new DrawLine();