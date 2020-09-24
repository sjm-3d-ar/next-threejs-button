import * as THREE from "three";
import DomEvents from "./threex.domevents";

const createRoundedRectangle = (width, height, radius, color) => {
  const validRadius = radius > width || radius > height ? 0 : radius;

  const roundedRectShape = new THREE.Shape();

  const x = 0;
  const y = 0;

  // move to drawing starting point
  roundedRectShape.moveTo(x, y + validRadius);

  // draw first edge, with ending corner curve
  roundedRectShape.lineTo(x, y + height - validRadius);
  roundedRectShape.quadraticCurveTo(x, y + height, x + validRadius, y + height);

  // draw second edge, with ending corner curve
  roundedRectShape.lineTo(x + width - validRadius, y + height);
  roundedRectShape.quadraticCurveTo(
    x + width,
    y + height,
    x + width,
    y + height - validRadius,
  );

  // draw third edge, with ending corner curve
  roundedRectShape.lineTo(x + width, y + validRadius);
  roundedRectShape.quadraticCurveTo(x + width, y, x + width - validRadius, y);

  // draw fourth edge, with ending corner curve
  roundedRectShape.lineTo(x + validRadius, y);
  roundedRectShape.quadraticCurveTo(x, y, x, y + validRadius);

  const geometry = new THREE.ShapeBufferGeometry(roundedRectShape);

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide }),
  );

  return mesh;
};

const createPlaneWithTexture = (width, height, image) => {
  const geometry = new THREE.PlaneBufferGeometry(width, height);

  const loader = new THREE.TextureLoader();

  const material = new THREE.MeshBasicMaterial({
    map: loader.load(image),
  });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

// options:
//   color - can be a CSS color string, or RGB hex value
//   radius - must be smaller than width and height
//   image - url / path to image (if image provided, color & radius are ignored)
const createButton = (options, camera, renderer) => {
  const { width, height, image, onClick, name, radius, color } = options;

  const button = image
    ? createPlaneWithTexture(width, height, image)
    : createRoundedRectangle(width, height, radius, color);

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
