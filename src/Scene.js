import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Sky } from "@react-three/drei";
import "./App.css";
import Ocean from "./Ocean";
import { Wave } from "./Wave";

export function Scene(props) {
  return (
    <Canvas camera={{ fov: 12, position: [5, 0.6, 15] }}>
      <Suspense maxDuration={5000} fallback={null}>
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, 10, 10]} />
        <pointLight position={[-10, 10, -10]} />
        <pointLight position={[-10, -10, -10]} />
        <pointLight position={[10, -10, 10]} />
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
        <Wave file={[require("./posters/elaine.jpg")]} position={[0, 0, 0]} planeGeometryArgs={[0.4, 0.4 * (8 / 5), 16, 16]} />
        <Wave file={[require("./posters/elaine2.jpg")]} position={[0.65, 0, 0]} planeGeometryArgs={[0.5, 0.5 * (8 / 5), 16, 16]} />
        <Wave file={[require("./posters/elaine3.jpg")]} position={[-0.65, 0, 0]} planeGeometryArgs={[0.6, 0.6 * (8 / 5), 16, 16]} />

        <group transform position={[0, 0, -1.5]}>
          {props.allPhotos.map((item, index) =>
            item.orientation === "horizontal" ? (
              <Wave
                key={index}
                file={item.file}
                position={[Math.random() * 10 - 5, Math.random() * 2, Math.random() * 2 - 1]}
                planeGeometryArgs={[0.5, 0.5 * (4 / 6), 16, 16]}
              />
            ) : (
              <Wave
                key={index}
                file={item.file}
                position={[Math.random() * 10 - 5, Math.random() * 2, Math.random()]}
                planeGeometryArgs={[0.5, 0.5 * (6 / 4), 16, 16]}
              />
            )
          )}
        </group>

        {/* 
        //TODO:
        // make positioning of photos better so scattered across page
        */}

        {/* <Html position={[0.1, -0.35, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html> */}
        <Html position={[0.24, 0.5, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <p> * ‧̍̊˙· 𓆝.° </p>
        </Html>
        <Html position={[-0.3, 0, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <p> ｡˚𓆛˚｡ °.𓆞 ·˙‧̍̊</p>
        </Html>
        {/* <Html position={[-0.31, 0.5, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html> */}
        {/* <Html position={[0.3, 0, 0]} scale={(0.1, 0.1, 0.1)} color="black">
          <a href="https://tinyurl.com/elainePHD">RSVP</a>
        </Html> */}
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
}
