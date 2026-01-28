import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function MoonTerrain() {
  const meshRef = useRef();

  // Create crater positions
  const craters = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 25;
      positions.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.5 + Math.random() * 2,
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Main moon surface - large flat area with slight curve */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Terrain bumps and rocks */}
      {craters.map((crater, i) => (
        <group key={i} position={[crater.x, 0, crater.z]}>
          {/* Crater rim */}
          <mesh position={[0, 0.1 * crater.scale, 0]} receiveShadow castShadow>
            <torusGeometry args={[crater.scale, 0.2 * crater.scale, 8, 16]} />
            <meshStandardMaterial color="#2d2d2d" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Scattered rocks */}
      <Rocks />

      {/* Dust particles on ground */}
      <GroundDust />
    </group>
  );
}

// Scattered rocks on the surface
function Rocks() {
  const rocks = useMemo(() => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 40;
      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.random() * 0.3,
          Math.sin(angle) * radius,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.1 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#2d2d2d' : '#1f1f1f'}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating dust particles
function GroundDust() {
  const dustRef = useRef();
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 50;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.random() * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (dustRef.current) {
      dustRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD700"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default MoonTerrain;
