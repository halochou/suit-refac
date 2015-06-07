var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var scene, canvas, renderer, camera, controls;
var onWindowResize;
var render;
var currentState = {};

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
};

render = function () {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};


onWindowResize = function () {
	renderer.setSize( canvas.scrollWidth, canvas.scrollHeight ,false);
	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	camera.updateProjectionMatrix();

	render();
};

var _updateModelFromLoader = function (targetName, objPath, mtlPath){
  var loader = new THREE.OBJMTLLoader();
  loader.load(objPath, mtlPath,
    //onSuccess
    function (newModel) {
      newModel.name = targetName;
      scene.remove(scene.getObjectByName(targetName));
      scene.add(newModel);
    },
    //onProgress
    function (xhr) {
      // if ( xhr.lengthComputable ) {
      //   var percentComplete = xhr.loaded / xhr.total * 100;
      //   console.log( Math.round(percentComplete, 2) + '% downloaded' );
      // }
    },
    //onError
    function (xhr) {
    } );
};

// /assets/models/suit_main_double-breasted_2_side_fabric_black
var updateAll = function(newState) {
    console.log(newState);
    return;

    var mainOBJPath = '/assets/models/suit_main/' + newState.button + '_' + newState.tail + '.obj';
    var mainMTLPath = '/assets/models/suit_main/' + newState.button + '_' + newState.tail + '_' + newState.fabric + '.mtl';
    _updateModelFromLoader('suit_main', mainOBJPath, mainMTLPath);

    var collarOBJPath = '/assets/models/suit_collar/' + newState.button + '_' + newState.collar + '.obj';
    var collarMTLPath = '/assets/models/suit_collar/' + newState.button + '_' + newState.collar + '_' + newState.fabric + '.mtl';
    _updateModelFromLoader('suit_collar', mainOBJPath, mainMTLPath);

    var pocketOBJPath = '/assets/models/suit_pocket/' + newState.pocket + '.obj';
    var pocketOBJPath = '/assets/models/suit_pocket/' + newState.pocket + '_' + newState.fabric + '.mtl';
    _updateModelFromLoader('suit_pocket', mainOBJPath, mainMTLPath);

  //return newState;
};

module.exports  = {
  init : init,
  update : updateAll
};
