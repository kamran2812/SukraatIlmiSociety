import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import styles from './BlackHole.module.css';

function BlackHole() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Resize Handling
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Vertex Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
uniform sampler2D noiseTexture; // Add a uniform for the noise texture

void main() {
  vec2 center = vec2(0.5, 0.5);

  vec2 distortedUv = vUv + vec2(
    texture2D(noiseTexture, vUv * 10.0 + uTime * 0.1).r - 0.5, 
    texture2D(noiseTexture, vUv * 10.0 + uTime * 0.1).g - 0.5
  ) * 0.1; // Distort UVs based on noise

  // Use distortedUv instead of vUv for calculations
  float dist = distance(distortedUv, center); 

  float effect = 0.4 / dist * sin(uTime * 0.1); 

  vec3 color = vec3(0.0);
  color.r = effect;
  color.g = effect * 0.5;
  color.b = effect * 0.8;

  gl_FragColor = vec4(color, 1.0);
}
`;

   
    

   

    const blackHoleMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 }
      },
    });

    // Create a sphere for the black hole core
    const blackHoleGeometry = new THREE.SphereGeometry(10, 64, 64);
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    // Array to store all black holes and their particles
    const blackHoles = [];

    // Function to create multiple black holes after the explosion
    function createRandomBlackHoles(count) {
      for (let i = 0; i < count; i++) {
        const blackHoleGeometry = new THREE.SphereGeometry(10, 64, 64);
        const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);

        // Set random position within a certain range
        blackHole.position.set(
          (Math.random() - 0.5) * 200, 
          (Math.random() - 0.5) * 200, 
          (Math.random() - 0.5) * 200  
        );

        scene.add(blackHole);
        blackHoles.push(blackHole); 

        // Create particles for the new black hole
        createParticlesForBlackHole(blackHole);
      }
    }

    function createParticlesForBlackHole(blackHole) {
      const particleCount = 1500;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        const x = radius * Math.cos(angle) + blackHole.position.x; 
        const y = radius * Math.sin(angle) + blackHole.position.y; 
        const z = (Math.random() - 0.5) * 20 + blackHole.position.z; 

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Store particles with black hole for interaction
      blackHole.particles = particles;
    }

    // Initial particles for the first black hole
    createParticlesForBlackHole(blackHole);

    function autoTriggerExplosion() {
        // Use setTimeout to trigger the explosion after 30 seconds
        setTimeout(() => {
            // Call zoomEffect and triggerEnergyBlast functions here
            zoomEffect(); // Start zoom effect
            triggerEnergyBlast(); // Start energy blast
        }, 30000); // 30 seconds delay (in milliseconds)
    }

    function createGalaxy() {
      const galaxyGeometry = new THREE.SphereGeometry(1000, 64, 64);
      const galaxyMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: true, // Makes stars smaller in the distance
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
      });
    
      const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
      scene.add(galaxy);
    }
    
    // Call this function in your useEffect after setting up the scene
    createGalaxy();
    
    function createEventHorizon(blackHole) {
      const geometry = new THREE.TorusGeometry(12, 1, 32, 100); // Adjust radius as needed
      const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.5, 
        side: THREE.DoubleSide 
      });
      const torus = new THREE.Mesh(geometry, material);
      blackHole.add(torus); // Add the torus to the black hole mesh
    }

    // Start the process by calling the autoTriggerExplosion function
    autoTriggerExplosion();

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Touch move event
    document.addEventListener("touchmove", (event) => {
      const touch = event.touches[0]; 
      mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    });

    function animateParticles() {
      blackHole.rotation.y += 0.001; // Rotate the initial black hole
      blackHole.particles.rotation.y += 0.002; // Rotate particles around it
      blackHole.particles.rotation.x = mouseY * 0.5; // Interact with mouse Y
      blackHole.particles.rotation.z = mouseX * 0.5; // Interact with mouse X

      blackHoles.forEach(blackHole => {
        blackHole.rotation.y += 0.001; 
        blackHole.particles.rotation.y += 0.002; 
        blackHole.particles.rotation.x = mouseY * 0.5;
        blackHole.particles.rotation.z = mouseX * 0.5;
      });

      // In your animateParticles() function

blackHoles.forEach(blackHole => {
  // ... existing rotation code ...

  // Apply a slight gravitational pull towards the center
  const center = new THREE.Vector3(0, 0, 0);
  const direction = new THREE.Vector3().subVectors(center, blackHole.position).normalize();
  const force = 0.001 / blackHole.position.distanceToSquared(center); // Inverse square law
  blackHole.position.addScaledVector(direction, force);

  // Update particle positions based on black hole's gravity
  const particlePositions = blackHole.particles.geometry.attributes.position.array;
  for (let i = 0; i < particlePositions.length; i += 3) {
    const particlePosition = new THREE.Vector3(
      particlePositions[i],
      particlePositions[i + 1],
      particlePositions[i + 2]
    );
    const particleDirection = new THREE.Vector3().subVectors(blackHole.position, particlePosition).normalize();
    const particleForce = 0.01 / particlePosition.distanceToSquared(blackHole.position); // Adjust force as needed
    particlePosition.addScaledVector(particleDirection, particleForce);

    particlePositions[i] = particlePosition.x;
    particlePositions[i + 1] = particlePosition.y;
    particlePositions[i + 2] = particlePosition.z;
  }
  blackHole.particles.geometry.attributes.position.needsUpdate = true;
});
    }

    // Mouse Click Event for black hole
    document.addEventListener('mousedown', onBlackHoleClick);

    function onBlackHoleClick() {
      zoomEffect();
      triggerEnergyBlast();
    }

    function zoomEffect() {
      const targetPosition = new THREE.Vector3(0, 0, 0); 
      const zoomDuration = 1000; 
      let startTime = null;

      function animateZoom(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / zoomDuration, 1);
        const zoomFactor = 1 - progress; 

        camera.position.lerp(targetPosition, 1 - zoomFactor);
        camera.lookAt(blackHole.position);

        if (progress < 1) {
          requestAnimationFrame(animateZoom);
        } else {
          setTimeout(() => {
            removeAll(); 
          }, 1000); 
        }
      }
      requestAnimationFrame(animateZoom);
    }

    function triggerEnergyBlast() {
      const explosionGeometry = new THREE.SphereGeometry(15, 32, 32);
      const explosionMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 });
      const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
      explosion.position.copy(blackHole.position);
      scene.add(explosion);

      let explosionStartTime = null;
      const explosionDuration = 1000;

      function animateExplosion(timestamp) {
        if (!explosionStartTime) explosionStartTime = timestamp;
        
        const elapsed = timestamp - explosionStartTime;
        const progress = Math.min(elapsed / explosionDuration, 1);

        explosion.material.opacity = 1 - progress; 
        explosion.scale.set(1 + progress * 5, 1 + progress * 5, 1 + progress * 5); 

        if (progress < 1) {
          requestAnimationFrame(animateExplosion);
        } else {
          scene.remove(explosion);
        }
      }
      requestAnimationFrame(animateExplosion);
    }

    // Update the removeAll function to create new black holes after explosion
    function removeAll() {
      blackHoles.forEach(blackHole => {
        scene.remove(blackHole);
        scene.remove(blackHole.particles);
      });
      blackHoles.length = 0; 

      const blackHoleCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5; 
      createRandomBlackHoles(blackHoleCount);
    }

    function animate() {
      requestAnimationFrame(animate);
      blackHoleMaterial.uniforms.uTime.value += 0.05;
      animateParticles();
      renderer.render(scene, camera);
    }
    animate();

    return () => {// Clean up on unmount
        containerRef.current.removeChild(renderer.domElement);
      };
    }, []); // Empty dependency array ensures this runs once on mount
    return (
        <div
            className={styles.blackHoleContainer} // Apply the CSS module class
            ref={containerRef}
        />
    );
  }
  
  export default BlackHole;