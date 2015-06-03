var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var scene = new THREE.Scene();

//light
var light = new THREE.AmbientLight( 0xffffff);
light.name = "ambientlight";
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 0, 1 ).normalize();
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 0, -1 ).normalize();
scene.add( directionalLight );
