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
      {/* Ambient light - very low for space feel */}
      <ambientLight intensity={0.08} color="#ffffff" />

      {/* Main sun light - distant star */}
      <directionalLight
        position={[50, 30, 20]}
        intensity={0.6}
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
        position={[-30, 10, -20]}
        intensity={0.1}
        color="#FFD700"
      />

      {/* Gold accent light for atmosphere */}
      <pointLight
        position={[0, 15, 0]}
        intensity={0.3}
        color="#FFD700"
        distance={50}
      />

      {/* Moving atmospheric light */}
      <pointLight
        ref={movingLightRef}
        position={[0, 8, 0]}
        intensity={0.15}
        color="#FFD700"
        distance={25}
      />

      {/* Rim lights for dramatic effect */}
      <pointLight
        position={[-20, 5, -20]}
        intensity={0.1}
        color="#ffffff"
        distance={30}
      />

      <pointLight
        position={[20, 5, -20]}
        intensity={0.1}
        color="#FFD700"
        distance={30}
      />

      {/* Hemisphere light for natural look */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#1a1a1a"
        intensity={0.15}
      />
    </>
  );
}

export default Lights;
