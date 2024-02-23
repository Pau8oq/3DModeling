var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CustomObjLoader } from './customObjLoader';
export class Viewer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 15);
        this.camera.add(pointLight);
        this.camera.position.z = 5;
        this.animate();
    }
    loadFile(path) {
        let loader = new CustomObjLoader();
        loader.readJson(path);
    }
    loadObjAsync(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let loader = new OBJLoader();
            let obj = yield loader.loadAsync(path);
            this.scene.add(obj);
        });
    }
    animate() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}
