import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export class Viewer {

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private controls: OrbitControls;
    
    constructor() {
        this.renderer = new THREE.WebGLRenderer(); 
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    
    public init(): void{
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        const ambientLight = new THREE.AmbientLight( 0xffffff );
        this.scene.add( ambientLight );

        const pointLight = new THREE.PointLight( 0xffffff, 15 );
        this.camera.add( pointLight );

        this.camera.position.z = 5;
        
        this.animate();
    }

    public async loadObjAsync(path: string): Promise<void> {
        let loader = new OBJLoader();
        let obj = await loader.loadAsync(path);

       this.scene.add(obj);
    }

    
    private animate(): void{
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame(this.animate.bind(this));
    }
}