import * as THREE from "three";
import DomEvents from "./threex.domevents";

const createButton = (options, camera, renderer) => {
  const { width, height, image, onClick, name } = options;

  const geometry = new THREE.PlaneBufferGeometry(width, height);

  const loader = new THREE.TextureLoader();

  const material = new THREE.MeshBasicMaterial({
    map: loader.load(image),
  });

  const button = new THREE.Mesh(geometry, material);

  button.name = name;

  const domEvents = new DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(button, "click", event => onClick(event));

  return button;
};

const meshPhongInstance = (geometry, color, x, scene) => {
  const material = new THREE.MeshPhongMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;

  if (scene) scene.add(mesh);

  return mesh;
};

// this resizing logic may not be necessary. it seemed to behave as needed without it.
// this is possibly due to a later version of three.js? as the tutorial described
// different behavior.
const resizeRendererToDisplaySize = renderer => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
};

export default {
  createButton,
  meshPhongInstance,
  resizeRendererToDisplaySize,
};
