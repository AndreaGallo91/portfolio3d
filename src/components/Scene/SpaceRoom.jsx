import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function SpaceRoom() {
  const gridRef = useRef();

  // Subtle grid animation
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <group>
      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050510"
          metalness={0.5}
        />
      </mesh>

      {/* Grid lines on floor */}
      <gridHelper
        ref={gridRef}
        args={[50, 50, '#6b21a8', '#1e1e2e']}
        position={[0, 0.01, 0]}
      />

      {/* Ambient particles / stars */}
      <Stars />

      {/* Walls - subtle, dark */}
      <mesh position={[0, 10, -15]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial
          color="#0a0a15"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Side walls */}
      <mesh position={[-15, 10, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.9} />
      </mesh>

      <mesh position={[15, 10, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.9} />
      </mesh>

      {/* Decorative neon lines */}
      <NeonLines />
    </group>
  );
}

// Floating stars/particles
function Stars() {
  const starsRef = useRef();
  const starCount = 200;

  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = Math.random() * 15 + 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6b21a8"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Decorative neon accent lines
function NeonLines() {
  return (
    <group>
      {/* Floor accent lines */}
      <mesh position={[0, 0.02, -10]}>
        <boxGeometry args={[20, 0.02, 0.05]} />
        <meshBasicMaterial color="#6b21a8" />
      </mesh>

      <mesh position={[-8, 0.02, -5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.02, 0.05]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      <mesh position={[8, 0.02, -5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.02, 0.05]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Vertical accent on back wall */}
      <mesh position={[0, 5, -14.9]}>
        <boxGeometry args={[0.05, 8, 0.05]} />
        <meshBasicMaterial color="#6b21a8" />
      </mesh>

      {/* Horizontal accent on back wall */}
      <mesh position={[0, 8, -14.9]}>
        <boxGeometry args={[12, 0.05, 0.05]} />
        <meshBasicMaterial color="#6b21a8" />
      </mesh>
    </group>
  );
}

export default SpaceRoom;
