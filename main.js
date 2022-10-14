import './style.css'


import * as THREE from 'three';





import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Loader
const TextureLoader = new THREE.TextureLoader()
const normalTexture = TextureLoader.load('normal_pic.jpg')

const TextureSphereLoader = new THREE.TextureLoader()
const normalSphereTexture = TextureSphereLoader.load('normal_sphere.jpg')


//

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
 
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
});
 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
 
renderer.render(scene, camera);

//Material_Torus

const geometry =  new THREE.TorusGeometry(10 ,3 ,16, 100)

const material = new THREE.MeshStandardMaterial({
  color: 0x0c0c0c
  //black
  
});
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;


const torus = new THREE.Mesh(geometry, material);


scene.add(torus)
//



//Material_Sphere

const geometrySphere = new THREE.SphereGeometry(3, 32, 32); // (radius, widthSegments, heightSegments)
const materialSphere = new THREE.MeshBasicMaterial( {
  color: 0x000000} );

  materialSphere.metalness = 0.7
  materialSphere.roughness = 0.2
  material.normalMap = normalSphereTexture;


const sphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(sphere);





//




// Light
const pointLight = new THREE.PointLight(0x0a7e8c, 20) //blue
pointLight.position.set(-1,-1,-1)

//Second_Light
const pointLightTwo = new THREE.PointLight(0x1ad989, 20) //red
pointLightTwo.position.set(9,9,9)
pointLight.intensity = 1
//


//Ambient_Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);// white
scene.add(pointLight,pointLightTwo,ambientLight)
//




const controls = new OrbitControls(camera, renderer.domElement);
//Stars
function addStar(){
 const geometry = new THREE.SphereGeometry(0.25, 24, 24);
 const material = new THREE.MeshStandardMaterial({color: 0xffffff})
 const star = new THREE.Mesh( geometry, material);
 const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)
//


// image
const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = spaceTexture;
//
















//Animate_spin
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.009;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
 }
  
 animate()
//
