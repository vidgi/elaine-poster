import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import "./App.css";
import { waveShaderMaterial } from "./WaveShaderMaterial";

export function Wave(props) {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, props.file);

  return (
    <mesh position={props.position}>
      <planeGeometry args={props.planeGeometryArgs} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
}
