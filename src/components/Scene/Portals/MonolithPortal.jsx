import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../store/useStore';

export function MonolithPortal({ project, position = [0, 0, 0] }) {
  const monolithRef = useRef();
  const glowRef = useRef();
  const symbolsRef = useRef();
  const auraRef = useRef();

  const [hovered, setHovered] = useState(false);
  const { setSelectedProject, selectedProject } = useStore();
  const isSelected = selectedProject?.id === project.id;
  const isActive = hovered || isSelected;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Subtle floating motion
    if (monolithRef.current) {
      monolithRef.current.position.y = 2.5 + Math.sin(time * 0.5) * 0.1;
      monolithRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    }

    // Symbols animation
    if (symbolsRef.current) {
      symbolsRef.current.children.forEach((symbol, i) => {
        const offset = i * 0.5;
        symbol.material.opacity = isActive
          ? 0.5 + Math.sin(time * 2 + offset) * 0.5
          : 0.2 + Math.sin(time + offset) * 0.1;
        symbol.material.emissiveIntensity = isActive
          ? 0.5 + Math.sin(time * 3 + offset) * 0.5
          : 0.2;
      });
    }

    // Aura rotation
    if (auraRef.current) {
      auraRef.current.rotation.y = time * 0.3;
      auraRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    // Glow intensity
    if (glowRef.current) {
      glowRef.current.intensity = isActive ? 2 : 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'crosshair';
  };

  // Symbol patterns (circuit-like)
  const symbols = [
    { y: 1, width: 0.8 },
    { y: 0.3, width: 0.5 },
    { y: -0.4, width: 0.7 },
    { y: -1, width: 0.4 },
    { y: -1.6, width: 0.6 },
  ];

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Main monolith */}
      <group ref={monolithRef} position={[0, 2.5, 0]}>
        <mesh
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
        >
          {/* Perfect 1:4:9 ratio like in 2001 */}
          <boxGeometry args={[1.2, 4.8, 0.3]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing symbols/circuits on front face */}
        <group ref={symbolsRef} position={[0, 0, 0.16]}>
          {symbols.map((symbol, i) => (
            <mesh key={i} position={[0, symbol.y, 0]}>
              <planeGeometry args={[symbol.width, 0.08]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.3}
                transparent
                opacity={0.3}
              />
            </mesh>
          ))}

          {/* Vertical lines */}
          <mesh position={[-0.3, 0, 0]}>
            <planeGeometry args={[0.03, 3]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              transparent
              opacity={0.2}
            />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <planeGeometry args={[0.03, 3]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>

        {/* Edge glow */}
        <mesh position={[0, 0, -0.16]}>
          <boxGeometry args={[1.25, 4.85, 0.01]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={isActive ? 0.3 : 0.1}
          />
        </mesh>

        {/* Mysterious aura particles */}
        <group ref={auraRef}>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 1.5;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle * 2) * 2,
                  Math.sin(angle) * radius,
                ]}
              >
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial
                  color="#FFD700"
                  transparent
                  opacity={0.5}
                />
              </mesh>
            );
          })}
        </group>

        {/* Point light */}
        <pointLight
          ref={glowRef}
          color="#FFD700"
          intensity={0.5}
          distance={10}
        />
      </group>

      {/* Ground glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={isActive ? 0.2 : 0.05}
        />
      </mesh>

      {/* Label */}
      <Html position={[0, 5.5, 0]} center distanceFactor={15}>
        <div
          onClick={handleClick}
          style={{
            color: isActive ? '#FFD700' : '#ffffff',
            fontSize: '16px',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          {project.title}
        </div>
      </Html>
    </group>
  );
}

export default MonolithPortal;
