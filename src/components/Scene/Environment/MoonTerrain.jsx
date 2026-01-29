import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function MoonTerrain() {
  return (
    <group>
      {/* Main moon surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial
          color="#4a4a4a"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Ground rocks */}
      <GroundRocks />

      {/* Floating rocks */}
      <FloatingRocks />

      {/* Dust particles */}
      <GroundDust />
    </group>
  );
}

// Ground rocks - many scattered rocks on the surface
function GroundRocks() {
  const rocks = useMemo(() => {
    const items = [];
    // More rocks - 120 total
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 45;
      const scale = 0.1 + Math.random() * 0.8;
      items.push({
        position: [
          Math.cos(angle) * radius,
          scale * 0.3, // Half buried in ground
          Math.sin(angle) * radius,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale,
        type: Math.floor(Math.random() * 3), // Different rock shapes
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
          {rock.type === 0 && <dodecahedronGeometry args={[1, 0]} />}
          {rock.type === 1 && <icosahedronGeometry args={[1, 0]} />}
          {rock.type === 2 && <octahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={i % 3 === 0 ? '#5a5a5a' : i % 3 === 1 ? '#4a4a4a' : '#3d3d3d'}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating rocks in the air - reduced count
function FloatingRocks() {
  const floatingRocks = useMemo(() => {
    const items = [];
    // Only 8 floating rocks (70% reduction from 25)
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 30;
      items.push({
        position: [
          Math.cos(angle) * radius,
          3 + Math.random() * 6, // Float between 3-9 units high
          Math.sin(angle) * radius,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.4 + Math.random() * 0.8,
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatIntensity: 0.2 + Math.random() * 0.3,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {floatingRocks.map((rock, i) => (
        <Float
          key={i}
          speed={rock.floatSpeed}
          rotationIntensity={0.3}
          floatIntensity={rock.floatIntensity}
        >
          <mesh
            position={rock.position}
            rotation={rock.rotation}
            scale={rock.scale}
            castShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#5a5a5a"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        </Float>
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
