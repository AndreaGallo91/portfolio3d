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

      {/* Planets in the background - brighter colors */}
      <Planet
        position={[60, 35, -80]}
        size={18}
        color="#6a6a8a"
        ringColor="#FFD700"
        hasRing
      />
      <Planet
        position={[-50, 25, -60]}
        size={10}
        color="#c97b4a"
      />
      <Planet
        position={[25, 50, -100]}
        size={28}
        color="#e6a55f"
      />
      <Planet
        position={[-80, 15, -90]}
        size={7}
        color="#5a5a7a"
      />

      {/* Small moon nearby - more visible */}
      <Planet
        position={[35, 12, -35]}
        size={4}
        color="#7a7a7a"
      />

      {/* Red meteorites */}
      <Meteorites />

      {/* Luminous comets */}
      <Comets />
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

// Planet component - now with emissive for visibility in space
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
      {/* Planet body - now visible with emissive */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Planet atmosphere glow - more visible */}
      <mesh scale={1.15}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.3}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
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
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Red meteorites floating in space
function Meteorites() {
  const meteoritesRef = useRef([]);

  const meteorites = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      items.push({
        position: [
          Math.cos(angle) * distance,
          10 + Math.random() * 50,
          Math.sin(angle) * distance - 50,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.5 + Math.random() * 2,
        rotationSpeed: 0.2 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    meteoritesRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += meteorites[i].rotationSpeed * 0.01;
        mesh.rotation.y += meteorites[i].rotationSpeed * 0.015;
      }
    });
  });

  return (
    <group>
      {meteorites.map((met, i) => (
        <mesh
          key={i}
          ref={(el) => (meteoritesRef.current[i] = el)}
          position={met.position}
          rotation={met.rotation}
          scale={met.scale}
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#8B0000"
            emissive="#ff2200"
            emissiveIntensity={0.4}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Luminous comets with tails
function Comets() {
  const cometsRef = useRef([]);
  const tailsRef = useRef([]);

  const comets = useMemo(() => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        startPosition: [
          -100 - Math.random() * 50,
          20 + Math.random() * 40,
          -50 - Math.random() * 50,
        ],
        speed: 0.3 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 1.2,
        offset: Math.random() * 100,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    cometsRef.current.forEach((mesh, i) => {
      if (mesh) {
        const comet = comets[i];
        const progress = ((time * comet.speed + comet.offset) % 200) - 50;
        mesh.position.x = comet.startPosition[0] + progress * 1.5;
        mesh.position.y = comet.startPosition[1] + Math.sin(progress * 0.05) * 5;
        mesh.position.z = comet.startPosition[2] + progress;
      }
    });
    tailsRef.current.forEach((tail, i) => {
      if (tail) {
        const comet = comets[i];
        const progress = ((time * comet.speed + comet.offset) % 200) - 50;
        tail.position.x = comet.startPosition[0] + progress * 1.5 - 3;
        tail.position.y = comet.startPosition[1] + Math.sin(progress * 0.05) * 5;
        tail.position.z = comet.startPosition[2] + progress - 2;
      }
    });
  });

  return (
    <group>
      {comets.map((comet, i) => (
        <group key={i}>
          {/* Comet head */}
          <mesh
            ref={(el) => (cometsRef.current[i] = el)}
            position={comet.startPosition}
            scale={comet.scale}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Comet glow */}
          <mesh
            position={comet.startPosition}
            scale={comet.scale * 1.5}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color="#87CEEB"
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Comet tail */}
          <mesh
            ref={(el) => (tailsRef.current[i] = el)}
            position={[comet.startPosition[0] - 3, comet.startPosition[1], comet.startPosition[2] - 2]}
            rotation={[0, Math.PI / 4, Math.PI / 2]}
            scale={[comet.scale * 8, comet.scale * 0.8, comet.scale * 0.8]}
          >
            <coneGeometry args={[1, 3, 8]} />
            <meshBasicMaterial
              color="#87CEEB"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default SpaceSky;
