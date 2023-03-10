import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { Html, shaderMaterial, OrbitControls, Sky, Loader } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./App.css";
import Ocean from "./Ocean";
import VidyaIcon from "@mui/icons-material/AutoAwesome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";

// import { Leva, useControls } from "leva";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: `"Courier", "Arial", monospace`,
  },
  card: {
    backgroundColor: "#c5ccb6 !important",
  },
});

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
  // const config = useControls({
  //   turbidity: { value: 5, min: 0.1, max: 100, step: 0.1 },
  //   rayleigh: { value: 1, min: 1, max: 20, step: 1 },
  //   mieCoefficient: { value: 0.01, min: 0, max: 1, step: 0.005 },
  //   mieDirectionalG: { value: 0.8, min: 0, max: 10, step: 0.1 },
  //   inclination: { value: 2, min: 0.1, max: 10, step: 0.01 },
  //   azimuth: { value: 0.25, min: 0.1, max: 1, step: 0.01 },
  //   sunPosition: {
  //     value: [100, 20, 100],
  //     step: 1000,
  //   },
  // });
  return (
    <Canvas camera={{ fov: 12, position: [5, 0.6, 15] }}>
      <Suspense fallback={null}>
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, 10, 10]} />
        <pointLight position={[-10, 10, -10]} />
        <pointLight position={[-10, -10, -10]} />
        <pointLight position={[10, -10, 10]} />
        {/* <Sky {...config} /> */}

        {/* <Sky
          sunPosition={[-4500, 4, -5000]}
          inclination={2.98}
          azimuth={0.23}
          mieDirectionalG={1.2}
          mieCoefficient={0}
          rayleigh={3}
          turbidity={6.7}
        /> */}

        <Sky
          sunPosition={[-3200, 200, -10000]}
          inclination={2.98}
          azimuth={0.23}
          mieDirectionalG={1.2}
          mieCoefficient={0}
          rayleigh={1}
          turbidity={6.7}
        />

        <Ocean />
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
          enablePan={false}
          minDistance={2}
          maxDistance={40}
          maxAzimuthAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 3}
          minPolarAngle={Math.PI / 6}
        />
      </Suspense>
    </Canvas>
  );
};

const App = () => {
  return (
    <>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <ThemeProvider theme={theme}>
          <div
            style={{
              position: "absolute",
              bottom: "0em",
              right: "0em",
              zIndex: "10000",
            }}
          >
            <Tooltip title="made by vidya giri">
              <Button target="_blank" rel="noreferrer" href="https://vidyagiri.com">
                <VidyaIcon />
              </Button>
            </Tooltip>
          </div>

          <Scene />
          <Loader />
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;
