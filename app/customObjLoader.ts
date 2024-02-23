import { FileLoader } from "three/src/loaders/FileLoader";
import { ViSoftModel } from "./ViSoftModel";
import * as THREE from "three";

export class CustomObjLoader{
    
    private readonly SCALE: number = 100;

    public async readJsonAsync(path: string, scene: THREE.Scene): Promise<void>{
        const loader = new FileLoader();
        let dataJson = await loader.loadAsync(path) as string;

        let model: ViSoftModel = JSON.parse(dataJson);

        let coordsArray = model.Geometry.Coords.map(el=>[el.X, el.Y, el.Z]);
        var positions  = Array.prototype.concat.apply([], coordsArray);

        positions = positions.map(w=>w / this.SCALE);

        let normalsArray = model.Geometry.Normals.map(el=>[el.X, el.Y, el.Z]);
        var normalss  = Array.prototype.concat.apply([], normalsArray);

        normalss = normalss.map(w=>w / this.SCALE);

        let uvsArray = model.Geometry.TexCoords.map(el=>[el.X, el.Y]);
        var uvs  = Array.prototype.concat.apply([], uvsArray);

        //normalss = normalss.map(w=>w / 1000);

        //console.log(newArray);
        
        let geometry = new THREE.BufferGeometry();
        
        let indices: number[] = [];
        let vertices: number[] = [];
        let normals: number[] = [];
        let colors: number[] = [];

        const size = 20;
        const segments = 10;

        const halfSize = size / 2;
        const segmentSize = size / segments;

        const _color = new THREE.Color();

        // generate vertices, normals and color data for a simple grid geometry

        for ( let i = 0; i <= segments; i ++ ) {

            const y = ( i * segmentSize ) - halfSize;

            for ( let j = 0; j <= segments; j ++ ) {
                const x = ( j * segmentSize ) - halfSize;

                vertices.push( x, - y, 0 );
                normals.push( 0, 0, 1 );

                const r = ( x / size ) + 0.5;
                const g = ( y / size ) + 0.5;

                _color.setRGB( 12, 12, 1, THREE.SRGBColorSpace );
                colors.push( _color.r, _color.g, _color.b );
            }
        }

        // generate indices (data for element array buffer)

        for ( let i = 0; i < segments; i ++ ) {

            for ( let j = 0; j < segments; j ++ ) {

                const a = i * ( segments + 1 ) + ( j + 1 );
                const b = i * ( segments + 1 ) + j;
                const c = ( i + 1 ) * ( segments + 1 ) + j;
                const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

                // generate two faces (triangles) per iteration

                indices.push( a, b, d ); // face one
                indices.push( b, c, d ); // face two
            }
        }

        geometry.setIndex(model.Geometry.Indexes);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute( normalss, 3 ) );
        geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ) );
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            vertexColors: true,
        });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('./assets/crate.gif', function(texture) {
            console.log('texture loaded');

            var material = new THREE.MeshBasicMaterial({
                map: texture
            });
            var mesh = new THREE.Mesh(geometry, material);
            //mesh.position.z = -100;

            scene.add(mesh);

            //renderer.render(scene, camera);
        }, undefined, function(err) {
            console.error('texture not loaded', err)
        });

        // let mesh = new THREE.Mesh( geometry, material );
        // scene.add(mesh);
    }
}