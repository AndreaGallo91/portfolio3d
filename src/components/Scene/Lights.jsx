import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Lights() {
  const movingLightRef = useRef();

  // Subtle moving light for atmosphere
  useFrame((state) => {
    if (movingLightRef.current) {
      movingLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 5;
      movingLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 5;
    }
  });

  return (
    <>
      {/* Ambient light - very low for space feel */}
      <ambientLight intensity={0.1} color="#1e1e3f" />

      {/* Main directional light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        color="#e5e7eb"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Purple accent light from above */}
      <pointLight
        position={[0, 8, -5]}
        intensity={0.8}
        color="#6b21a8"
        distance={20}
      />

      {/* Cyan accent light - front */}
      <pointLight
        position={[0, 3, 5]}
        intensity={0.3}
        color="#06b6d4"
        distance={15}
      />

      {/* Moving atmospheric light */}
      <pointLight
        ref={movingLightRef}
        position={[0, 5, 0]}
        intensity={0.2}
        color="#6b21a8"
        distance={12}
      />

      {/* Spot light on center area */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.5}
        color="#ffffff"
        castShadow
        target-position={[0, 0, -3]}
      />

      {/* Rim lights for depth */}
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.15}
        color="#ec4899"
        distance={20}
      />

      <pointLight
        position={[10, 5, -10]}
        intensity={0.15}
        color="#10b981"
        distance={20}
      />
    </>
  );
}

export default Lights;
