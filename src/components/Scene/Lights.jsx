import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Lights() {
  const movingLightRef = useRef();

  useFrame((state) => {
    if (movingLightRef.current) {
      movingLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 15;
      movingLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 15;
    }
  });

  return (
    <>
      {/* Ambient light - increased for better visibility */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main sun light - bright distant star */}
      <directionalLight
        position={[50, 50, 30]}
        intensity={1.5}
        color="#fffaf0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Secondary fill light - from planet reflection */}
      <directionalLight
        position={[-30, 20, -20]}
        intensity={0.5}
        color="#FFD700"
      />

      {/* Gold accent light for atmosphere */}
      <pointLight
        position={[0, 20, 0]}
        intensity={1.0}
        color="#FFD700"
        distance={80}
      />

      {/* Moving atmospheric light */}
      <pointLight
        ref={movingLightRef}
        position={[0, 10, 0]}
        intensity={0.5}
        color="#FFD700"
        distance={40}
      />

      {/* Rim lights for dramatic effect */}
      <pointLight
        position={[-25, 8, -25]}
        intensity={0.4}
        color="#ffffff"
        distance={50}
      />

      <pointLight
        position={[25, 8, -25]}
        intensity={0.4}
        color="#FFD700"
        distance={50}
      />

      {/* Extra front light so portals are visible */}
      <pointLight
        position={[0, 5, 10]}
        intensity={0.6}
        color="#ffffff"
        distance={60}
      />

      {/* Hemisphere light for natural look */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#2a2a2a"
        intensity={0.5}
      />
    </>
  );
}

export default Lights;
