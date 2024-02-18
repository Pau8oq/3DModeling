import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        this.camera.position.z = 5;
        
        this.animate();
    }

    
    private animate(): void{
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame(this.animate.bind(this));
    }
}