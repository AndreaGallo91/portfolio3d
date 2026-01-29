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

// Orbiting meteorites in space - realistic orbital motion
function Meteorites() {
  const meteoritesRef = useRef([]);

  const meteorites = useMemo(() => {
    const items = [];
    // Only 6 meteorites for realism
    for (let i = 0; i < 6; i++) {
      const orbitRadius = 60 + i * 15;
      const orbitSpeed = 0.02 + Math.random() * 0.03;
      const orbitTilt = (Math.random() - 0.5) * 0.3;
      const startAngle = Math.random() * Math.PI * 2;
      items.push({
        orbitRadius,
        orbitSpeed,
        orbitTilt,
        startAngle,
        height: 15 + Math.random() * 25,
        scale: 0.8 + Math.random() * 1.5,
        rotationSpeed: 0.1 + Math.random() * 0.3,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    meteoritesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const met = meteorites[i];
        const angle = met.startAngle + time * met.orbitSpeed;
        // Orbital motion
        mesh.position.x = Math.cos(angle) * met.orbitRadius;
        mesh.position.z = Math.sin(angle) * met.orbitRadius - 40;
        mesh.position.y = met.height + Math.sin(angle * 2) * met.orbitTilt * 10;
        // Self rotation
        mesh.rotation.x += met.rotationSpeed * 0.01;
        mesh.rotation.y += met.rotationSpeed * 0.015;
      }
    });
  });

  return (
    <group>
      {meteorites.map((met, i) => (
        <mesh
          key={i}
          ref={(el) => (meteoritesRef.current[i] = el)}
          scale={met.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#5a3a3a"
            emissive="#aa4400"
            emissiveIntensity={0.2}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Orbiting comet with tail - just 2 for realism
function Comets() {
  const cometsRef = useRef([]);
  const tailsRef = useRef([]);
  const glowsRef = useRef([]);

  const comets = useMemo(() => {
    return [
      {
        orbitRadius: 90,
        orbitSpeed: 0.015,
        startAngle: 0,
        height: 30,
        scale: 0.6,
        tilt: 0.2,
      },
      {
        orbitRadius: 120,
        orbitSpeed: 0.01,
        startAngle: Math.PI,
        height: 45,
        scale: 0.8,
        tilt: -0.15,
      },
    ];
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    cometsRef.current.forEach((mesh, i) => {
      if (mesh) {
        const comet = comets[i];
        const angle = comet.startAngle + time * comet.orbitSpeed;
        const x = Math.cos(angle) * comet.orbitRadius;
        const z = Math.sin(angle) * comet.orbitRadius - 50;
        const y = comet.height + Math.sin(angle) * comet.tilt * 20;

        mesh.position.set(x, y, z);

        // Update glow position
        if (glowsRef.current[i]) {
          glowsRef.current[i].position.set(x, y, z);
        }

        // Tail follows and points away from movement direction
        if (tailsRef.current[i]) {
          const tailAngle = angle - Math.PI / 2;
          const tailX = x - Math.cos(angle) * 4;
          const tailZ = z - Math.sin(angle) * 4;
          tailsRef.current[i].position.set(tailX, y, tailZ);
          tailsRef.current[i].rotation.set(0, -angle + Math.PI / 2, Math.PI / 2);
        }
      }
    });
  });

  return (
    <group>
      {comets.map((comet, i) => (
        <group key={i}>
          {/* Comet head */}
          <mesh ref={(el) => (cometsRef.current[i] = el)} scale={comet.scale}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#e0e8ff" />
          </mesh>
          {/* Comet glow */}
          <mesh ref={(el) => (glowsRef.current[i] = el)} scale={comet.scale * 2}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#aaccff" transparent opacity={0.3} />
          </mesh>
          {/* Comet tail */}
          <mesh
            ref={(el) => (tailsRef.current[i] = el)}
            scale={[comet.scale * 12, comet.scale * 0.6, comet.scale * 0.6]}
          >
            <coneGeometry args={[1, 4, 6]} />
            <meshBasicMaterial
              color="#88aadd"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default SpaceSky;
