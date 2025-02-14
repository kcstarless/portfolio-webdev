import styles from "./style.module.scss";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";

import circleImage from "../../assets/images/circle.png";

const Points = () => {
  const imgTexture = useLoader(THREE.TextureLoader, circleImage);
  const bufferRef = useRef();
  const tRef = useRef(0);
  const mousePosRef = useRef(new THREE.Vector3(0, 0, 0));
  const { camera } = useThree();

  // State to track the color of points
  const [color, setColor] = useState(new THREE.Color(0x00aaff));

  // Effect parameters
  const count = 100;
  const sep = 3;
  const f = 0.0002;
  const a = 60;
  const mouseInfluenceRadius = 28;
  const mouseStrength = 10;
  const mouseWaveSpeed = 5;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      const vector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.y / dir.y;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mousePosRef.current = pos;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Event listener for mouse click to change color
    const handleMouseClick = () => {
      // Change the color of points randomly upon mouse click
      const randomColor = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      setColor(randomColor);
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [camera]);

  // Initialize positions
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * count * 3);
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        posArray[i] = x;
        posArray[i + 1] = 0;
        posArray[i + 2] = z;
        i += 3;
      }
    }
    return posArray;
  }, [count, sep]);

  // Animation frame
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    tRef.current = time * 50;
    const positions = bufferRef.current.array;
    const mouseX = mousePosRef.current.x;
    const mouseZ = mousePosRef.current.z;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);

        // Base wave motion
        let y = Math.sin(f * (x ** 2 + z ** 2 + tRef.current)) * a;

        // Mouse interaction
        const dx = x - mouseX;
        const dz = z - mouseZ;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const falloff = Math.max(0, 1 - distance / mouseInfluenceRadius);

        // Strong displacement effects
        y +=
          Math.sin(time * mouseWaveSpeed - distance * 0.5) *
          falloff *
          mouseStrength *
          2;

        y -= 30 * falloff * Math.min(1, distance * 0.3);

        positions[i + 1] = y;
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={count * count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={imgTexture}
        color={color} // Dynamically set color here
        size={1.5}
        sizeAttenuation={true}
        transparent={true}
        alphaTest={0.05}
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AnimatedCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 320, 0], fov: 60 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.2} />
        <Points />
      </Suspense>
    </Canvas>
  );
};

export const LandingCanvas = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <AnimatedCanvas />
      </Suspense>
    </div>
  );
};
