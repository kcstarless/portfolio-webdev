import { Canvas, useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import colorTexture from "../../assets/images/color.webp";
import normalTexture from "../../assets/images/normal.webp";
import aoMapTexture from "../../assets/images/occlusion.webp";

const ProjectCanvas = () => {
  const EarthSphere = () => {
    const ref = useRef(null);
    const [rotationSpeed, setRotationSpeed] = useState(0);

    const [color, normal, aoMap] = useLoader(TextureLoader, [
      colorTexture,
      normalTexture,
      aoMapTexture,
    ]);

    useFrame((_, delta) => {
      // Apply the rotation speed to the sphere's rotation on the Y-axis
      ref.current.rotation.y += rotationSpeed * delta;
    });

    // Handle mouse scroll to change rotation speed direction
    useEffect(() => {
      const handleWheel = (event) => {
        // If scroll is down, rotate in one direction; if scroll is up, rotate in the opposite direction
        if (event.deltaY > 0) {
          // Scroll Down: rotate clockwise (positive speed)
          setRotationSpeed(0.1);
        } else {
          // Scroll Up: rotate counterclockwise (negative speed)
          setRotationSpeed(-0.1);
        }
      };

      // Add wheel event listener to the canvas container
      window.addEventListener("wheel", handleWheel);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
      <mesh scale={2} ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </mesh>
    );
  };

  return (
    <Canvas className="project-canvas">
      <ambientLight intensity={1} />
      <directionalLight intensity={20} position={[5, 0, -0.25]} />
      <EarthSphere />
    </Canvas>
  );
};

export default ProjectCanvas;
