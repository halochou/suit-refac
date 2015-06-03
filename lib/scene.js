var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var scene = new THREE.Scene();

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

module.exports = scene;
