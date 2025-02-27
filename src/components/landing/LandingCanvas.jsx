import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "./shaders";
import styles from "./style.module.scss";
import { OrbitControls } from "@react-three/drei";

// Fluid-like Blob Component
const Blob = ({ position, size, clickCounter }) => {
  const meshRef = useRef();

  // Create uniforms once.
  // We don't include clickCounter in the dependency array
  // because we will update its value every frame.
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_speed: { value: 0.5 },
      u_intensity: { value: 1 },
      u_colorSpeed: { value: 1 },
      u_clickCounter: { value: clickCounter }, // initial value
    }),
    []
  );

  // Update uniforms each frame.
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value =
        state.clock.getElapsedTime();
      // Update the click counter uniform with the latest value
      meshRef.current.material.uniforms.u_clickCounter.value = clickCounter;
    }
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
const Scene = ({ clickCounter }) => {
  const sceneRef = useRef();
  const [blobSize, setBlobSize] = useState(() => getBlobSize());

  function getBlobSize() {
    if (window.innerWidth < 431) return 0.3; // Small screens
    if (window.innerWidth < 1024) return 0.6; // Tablets
    return 0.9; // Desktops
  }
  useEffect(() => {
    const handleResize = () => {
      setBlobSize(getBlobSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.5;
      sceneRef.current.rotation.x += delta * 0.1;
      sceneRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} castShadow />
      <Blob position={[0, 0, 0]} size={blobSize} clickCounter={clickCounter} />
    </group>
  );
};

// Landing Canvas with Style
export const LandingCanvas = ({ clickCounter }) => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene clickCounter={clickCounter} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
