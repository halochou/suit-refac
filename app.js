var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var scene = require('./lib/scene.js');
//var camera = require('./lib/camera.js');

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas_for_three'),
  antialias: true
});
renderer.setClearColor( 0xffffff );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight, false);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

var camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 1000 );
camera.position.z = 100;
camera.position.y = 0;

var controls = new OrbitControls( camera, renderer.domElement);
controls.target = new THREE.Vector3(0,0,0);
controls.noZoom = true;
controls.noPan = true;
controls.minPolarAngle = Math.PI/13*6; // radians
controls.maxPolarAngle = Math.PI/13*7; // radians
controls.autoRotate = false;
controls.autoRotateSpeed = 2.0;
controls.damping = 0.2;

controls.addEventListener( 'change', render );

var geometry = new THREE.BoxGeometry( 2, 2, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 20;

var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

render();
