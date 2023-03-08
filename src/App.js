import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { Html, shaderMaterial, OrbitControls } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.css";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);


    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 0.2;
      float noiseAmp = 0.1;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [require("./elaine.jpg")]);

  return (
    <mesh>
      {/* <planeBufferGeometry args={[50, 1, 16, 16]} /> */}
      <planeGeometry args={[0.4, 0.4 * (8 / 5), 16, 16]} />

      {/* <planeBufferGeometry args={[1.5, 1, 16, 16]} /> */}
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Wave2 = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [require("./elaine2.jpg")]);

  return (
    <mesh position={[0.65, 0, 0]}>
      <planeGeometry args={[0.5, 0.5 * (8 / 5), 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Wave3 = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [require("./elaine3.jpg")]);

  return (
    <mesh position={[-0.65, 0, 0]}>
      <planeGeometry args={[0.6, 0.6 * (8 / 5), 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
        <Wave2 />
        <Wave3 />
        <Html position={[0.1, -0.35, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html>

        <Html position={[0.24, 0.5, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <p> * ‧̍̊˙· 𓆝.° </p>
        </Html>

        <Html position={[-0.3, 0, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <p> ｡˚𓆛˚｡ °.𓆞 ·˙‧̍̊</p>
        </Html>

        <Html position={[-0.31, 0.5, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html>
        <Html position={[0.3, 0, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html>

        <OrbitControls
          minDistance={5}
          maxDistance={10}
          maxAzimuthAngle={Math.PI / 3}
          maxPolarAngle={Math.PI}
          minAzimuthAngle={-Math.PI / 3}
          minPolarAngle={0}
        />
      </Suspense>
    </Canvas>
  );
};

const App = () => {
  return (
    <>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <Scene />
      </div>
    </>
  );
};

export default App;
