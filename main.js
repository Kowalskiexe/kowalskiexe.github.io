import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 5;

let globe = null;

const loader = new GLTFLoader();
import planetUrl from './3d/m_planet2.glb';
console.log(planetUrl);
loader.load(planetUrl, function(gltf) {
    scene.add(gltf.scene);
    globe = gltf.scene;
    console.log(globe);
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);
    if (globe) {
        globe.rotation.x += 0.01;
        globe.rotation.y += 0.01;
    }
    renderer.render( scene, camera );
}
animate();
