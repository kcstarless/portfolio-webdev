import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "./shaders";
import styles from "./style.module.scss";
import { OrbitControls } from "@react-three/drei";

// Fluid-like Blob Component
const Blob = ({ position, size }) => {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_speed: { value: 0.5 },
      u_intensity: { value: 1 },
      u_colorSpeed: { value: 1 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// Scene Component with Camera Controls
const Scene = () => {
  const sceneRef = useRef();

  useFrame((state, delta) => {
    sceneRef.current.rotation.y += delta * 0.2;
    sceneRef.current.rotation.x += delta * 0.1;
    sceneRef.current.rotation.z += delta * 0.1;
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[0, 5, 5]} // Light coming from above and behind the camera
        intensity={1.5}
        castShadow
      />
      <Blob position={[0, 0, 0]} size={1.2} />
    </group>
  );
};

// Landing Canvas with Style
export const LandingCanvas = () => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
        <OrbitControls /> {/* Keep or remove based on need */}
      </Canvas>
    </div>
  );
};
