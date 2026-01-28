import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export function SpaceSky() {
  return (
    <group>
      {/* Multiple star layers for depth */}
      <Stars
        radius={200}
        depth={100}
        count={3000}
        factor={6}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Distant galaxies/nebulae */}
      <Nebula position={[100, 50, -150]} color="#FFD700" scale={30} />
      <Nebula position={[-80, 30, -120]} color="#ffffff" scale={20} />

      {/* Planets in the background */}
      <Planet
        position={[80, 40, -100]}
        size={15}
        color="#4a4a5a"
        ringColor="#FFD700"
        hasRing
      />
      <Planet
        position={[-60, 20, -80]}
        size={8}
        color="#8B4513"
      />
      <Planet
        position={[30, 60, -150]}
        size={25}
        color="#CD853F"
      />
      <Planet
        position={[-100, 10, -120]}
        size={5}
        color="#2d2d3d"
      />

      {/* Small moon nearby */}
      <Planet
        position={[40, 15, -40]}
        size={3}
        color="#3d3d3d"
      />
    </group>
  );
}

// Nebula/Galaxy effect
function Nebula({ position, color, scale }) {
  const nebulaRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spiral galaxy shape
      const angle = (i / count) * Math.PI * 4;
      const radius = (i / count) * scale;
      const spread = Math.random() * 5;

      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [scale]);

  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={nebulaRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Planet component
function Planet({ position, size, color, hasRing = false, ringColor = '#FFD700' }) {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Planet atmosphere glow */}
      <mesh scale={1.05}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ring if applicable */}
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default SpaceSky;
