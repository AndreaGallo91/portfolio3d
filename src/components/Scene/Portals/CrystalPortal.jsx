import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../store/useStore';

export function CrystalPortal({ project, onClick }) {
  const groupRef = useRef();
  const veinsRef = useRef([]);
  const glowRef = useRef();
  const { setHoveredObject, hoveredObject } = useStore();

  const isHovered = hoveredObject?.id === project.id;

  // Generate crystal/stalactite positions
  const crystals = useMemo(() => {
    const items = [];
    // Central large crystal
    items.push({
      position: [0, 0, 0],
      height: 4,
      radius: 0.4,
      rotation: [0, 0, 0],
    });
    // Surrounding smaller crystals
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const distance = 0.8 + Math.random() * 0.4;
      const height = 1.5 + Math.random() * 2;
      items.push({
        position: [
          Math.cos(angle) * distance,
          0,
          Math.sin(angle) * distance,
        ],
        height,
        radius: 0.15 + Math.random() * 0.15,
        rotation: [
          (Math.random() - 0.5) * 0.3,
          Math.random() * Math.PI * 2,
          (Math.random() - 0.5) * 0.3,
        ],
      });
    }
    return items;
  }, []);

  // Animation
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Pulse the veins
    veinsRef.current.forEach((vein, i) => {
      if (vein) {
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.7;
        vein.material.emissiveIntensity = pulse;
        vein.material.opacity = 0.5 + pulse * 0.3;
      }
    });

    // Pulse the glow
    if (glowRef.current) {
      const glowPulse = Math.sin(time * 1.5) * 0.2 + 0.5;
      glowRef.current.material.opacity = glowPulse;
    }

    // Gentle hover effect
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={project.position}
      onClick={onClick}
      onPointerOver={() => setHoveredObject(project)}
      onPointerOut={() => setHoveredObject(null)}
    >
      {/* Base glow on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Crystal formations */}
      {crystals.map((crystal, i) => (
        <group key={i} position={crystal.position} rotation={crystal.rotation}>
          {/* Main crystal body (dark rock) */}
          <mesh position={[0, crystal.height / 2, 0]} castShadow>
            <coneGeometry args={[crystal.radius, crystal.height, 6]} />
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          {/* Luminous veins */}
          {[0, 1, 2].map((veinIndex) => {
            const veinAngle = (veinIndex / 3) * Math.PI * 2 + (i * 0.5);
            const veinHeight = crystal.height * (0.3 + Math.random() * 0.5);
            return (
              <mesh
                key={veinIndex}
                ref={(el) => {
                  if (el) veinsRef.current[i * 3 + veinIndex] = el;
                }}
                position={[
                  Math.cos(veinAngle) * crystal.radius * 0.8,
                  veinHeight / 2 + 0.3,
                  Math.sin(veinAngle) * crystal.radius * 0.8,
                ]}
                rotation={[0, veinAngle, 0]}
              >
                <boxGeometry args={[0.03, veinHeight, 0.01]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            );
          })}

          {/* Crystal tip glow */}
          <mesh position={[0, crystal.height, 0]}>
            <sphereGeometry args={[crystal.radius * 0.5, 8, 8]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Central energy glow */}
      <mesh ref={glowRef} position={[0, 2, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floating particles around crystals */}
      <CrystalParticles />

      {/* Project title label */}
      <Html
        position={[0, 5, 0]}
        center
        style={{
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      >
        <div
          className="px-4 py-2 rounded-lg bg-black/80 border border-yellow-500/50 whitespace-nowrap"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <span className="text-yellow-500 font-semibold text-sm">
            {project.title}
          </span>
        </div>
      </Html>
    </group>
  );
}

// Floating particles around the crystal formation
function CrystalParticles() {
  const particlesRef = useRef();
  const count = 30;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      const height = Math.random() * 4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      // Float up and down
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#FFD700"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default CrystalPortal;
