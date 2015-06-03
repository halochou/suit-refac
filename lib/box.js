var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var scene, canvas, renderer, camera, controls;
var onWindowResize;
var render;

var init = function (params) {
  // var scene = require('./lib/scene.js');
  canvas = params.canvas;

  scene = new THREE.Scene();

  //light
  var light = new THREE.AmbientLight( 0xffffff);
  light.name = "ambientlight";
  scene.add(light);

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  scene.add( directionalLight );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0, -1 ).normalize();
  scene.add( directionalLight );

  var line_material = new THREE.LineBasicMaterial( { color: 0x999999 } ),
  geometry = new THREE.Geometry(),
  floor = -20, step = 10;

  for ( var i = 0; i <= 20; i ++ ) {
    geometry.vertices.push( new THREE.Vector3( - 100, floor, i * step - 100 ) );
    geometry.vertices.push( new THREE.Vector3(   100, floor, i * step - 100 ) );

    geometry.vertices.push( new THREE.Vector3( i * step - 100, floor, -100 ) );
    geometry.vertices.push( new THREE.Vector3( i * step - 100, floor,  100 ) );
  }

  var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
  scene.add( line );

  //

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( canvas.scrollWidth, canvas.scrollHeight, false);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 1000 );
  camera.position.z = 100;
  camera.position.y = 0;

  controls = new OrbitControls( camera, renderer.domElement);
  controls.target = new THREE.Vector3(0,0,0);
  controls.noZoom = true;
  controls.noPan = true;
  controls.minPolarAngle = Math.PI/13*6; // radians
  controls.maxPolarAngle = Math.PI/13*7; // radians
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2.0;
  controls.damping = 0.2;
  controls.addEventListener( 'change', render );

  window.addEventListener( 'resize', onWindowResize, false );

  var geometry = new THREE.BoxGeometry( 2, 2, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  render();
}

render = function () {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};


onWindowResize = function () {
	renderer.setSize( canvas.scrollWidth, canvas.scrollHeight ,false);
	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	camera.updateProjectionMatrix();

	render();
}

module.exports  = {
  init : init
};
