import React, { useRef, Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const groupRef = useRef();
  const lightRef = useRef();
  const candleRef = useRef();
  const flameRef = useRef();
  const spotLightRef = useRef();
  const [hoveredRegion, setHoveredRegion] = useState(null); // Track hovered brain region

  const brainGeometry = useMemo(() => {
    const geometry = new THREE.Group();
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);

    // Define brain regions with colors and information
    const brainRegions = [
      { color: "#C0B283", name: "Creativity", info: "The ability to generate new ideas and solutions." },
      { color: "#8B4513", name: "Logic", info: "The process of reasoning and critical thinking." },
      { color: "#DC143C", name: "Emotion", info: "The complex feelings and moods that influence behavior." },
      // Add more regions as needed
    ];

    for (let i = 0; i < 10; i++) {
      const region = brainRegions[i % brainRegions.length]; // Cycle through regions
      const material = new THREE.MeshStandardMaterial({ color: region.color });
      const sphere = new THREE.Mesh(sphereGeometry, material);
      const angle = (i / 10) * Math.PI * 2;
      const x = Math.sin(angle) * 0.5;
      const y = Math.cos(angle) * 0.5;
      const z = (Math.random() - 0.5) * 0.5;
      sphere.position.set(x, y, z);
      sphere.name = region.name; // Assign name to each sphere
      sphere.userData = { info: region.info }; // Store information in userData
      geometry.add(sphere);
    }

    return geometry;
  }, []);

  const springProps = useSpring({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handlePointerOver = (e) => {
    setHoveredRegion(e.object.name);
  };

  const handlePointerOut = () => {
    setHoveredRegion(null);
  };

  const handleClick = (e) => {
    alert(e.object.userData.info); // Display information about the clicked region
  };

  return (
    <div className={styles.heroSection}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#28363D");
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <SpotLight
            ref={spotLightRef}
            position={[0, 2, 0]}
            angle={0.2}
            penumbra={1}
            castShadow
          />
          <animated.group ref={groupRef} {...springProps}>
            <primitive
              object={brainGeometry}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={handleClick}
            />
            <mesh ref={candleRef} position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.5, 32]} />
              <meshStandardMaterial color="#996633" />
              <mesh ref={flameRef} position={[0, 0.35, 0]}>
                <coneGeometry args={[0.03, 0.2, 32]} />
                <meshBasicMaterial color="#E69900" />
              </mesh>
            </mesh>
          </animated.group>
          <AnimateObjects
            groupRef={groupRef}
            flameRef={flameRef}
            spotLightRef={spotLightRef}
            hoveredRegion={hoveredRegion} // Pass hoveredRegion to AnimateObjects
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
    </div>
  );
};

const AnimateObjects = ({ groupRef, flameRef, spotLightRef, hoveredRegion }) => {
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsedTime * 0.2;
    }

    if (flameRef.current) {
      const scale = 1 + Math.sin(elapsedTime * 10) * 0.2 + Math.sin(elapsedTime * 3) * 0.1;
      flameRef.current.scale.set(scale, scale, scale);

      const windStrength = Math.sin(elapsedTime * 2) * 0.05;
      flameRef.current.rotation.z = windStrength;
    }

    if (spotLightRef.current) {
      // Adjust intensity based on flame scale and hovered region
      const baseIntensity = 0.5 + Math.sin(elapsedTime * 2) * 0.5;
      const hoverIntensity = hoveredRegion ? 1.5 : 1; // Increase intensity on hover
      spotLightRef.current.intensity = baseIntensity * hoverIntensity;
    }
  });
  return null;
};

export default HeroSection;