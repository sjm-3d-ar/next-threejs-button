/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as THREE from "three";

import { tj } from "_utils";

const useStyles = makeStyles({
  root: {
    // NOTE: % may be necessary if displaying this on an iPhone
    //  vw, vh fills the window on desktop, but may distort the window on iPhone
    //  100% w, h did not always fill the window (it seemed to fill the window only
    //  when the aspect ratio was met or exceeded, else left white space)
    // This could be due to a later version of three.js, as it behaves differently
    // as described in the tutorial.
    width: "100vw",
    height: "100vh",

    display: "block",
  },
});

const Shapes = () => {
  const classes = useStyles();

  const canvas = useRef();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });

    const fov = 75;
    const aspect = 2; // w / h
    const near = 0.1;
    const far = 500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();

    const button = tj.createButton(
      {
        name: "textBtn",
        width: 1,
        height: 1,
        radius: 0.1,
        color: "blue",
        // image: "images/twitter.png",
        onClick: event => console.log("clicked on:", event.target),
      },
      camera,
      renderer,
    );
    scene.add(button);
    button.position.set(-1, -0.5, 0);

    const button2 = tj.createButton(
      {
        name: "TwitterBtn",
        width: 1,
        height: 1,
        // radius: 0.1,
        // color: 0xff0000,
        image: "images/twitter.png",
        onClick: event => console.log("clicked on:", event.target),
      },
      camera,
      renderer,
    );
    scene.add(button2);
    button2.position.x = 1;
    button2.position.y = 0;
    button2.position.z = 0;

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const render = () => {
      // this resizing logic may not be necessary. it seemed to behave as needed without it.
      // this is possibly due to a later version of three.js? as the tutorial described
      // different behavior.
      if (tj.resizeRendererToDisplaySize(renderer)) {
        // adjust camera aspect, to account for screen being resized
        camera.aspect = canvas.current.clientWidth / canvas.current.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, []);

  return <canvas className={classes.root} ref={canvas} />;
};

export default Shapes;
