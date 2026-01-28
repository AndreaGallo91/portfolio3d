import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../store/useStore';

export function StargatePortal({ project, position = [0, 0, 0] }) {
  const ringRef = useRef();
  const innerRingRef = useRef();
  const eventHorizonRef = useRef();
  const glyphsRef = useRef();
  const particlesRef = useRef();

  const { setSelectedProject, selectedProject } = useStore();
  const isSelected = selectedProject?.id === project.id;

  // Particles being sucked into the portal
  const particleCount = 100;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(angle) * 0.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate outer ring slowly
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
    }

    // Rotate inner ring opposite direction
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.2;
    }

    // Animate event horizon (wavy effect)
    if (eventHorizonRef.current) {
      eventHorizonRef.current.scale.x = 1 + Math.sin(time * 2) * 0.02;
      eventHorizonRef.current.scale.y = 1 + Math.cos(time * 2) * 0.02;
    }

    // Rotate glyphs
    if (glyphsRef.current) {
      glyphsRef.current.rotation.z = time * 0.05;
    }

    // Animate particles (spiral inward)
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const angle = Math.atan2(positions[idx + 1], positions[idx]);
        const radius = Math.sqrt(positions[idx] ** 2 + positions[idx + 1] ** 2);

        // Spiral inward
        const newRadius = radius - 0.02;
        if (newRadius < 0.5) {
          // Reset particle
          const resetAngle = Math.random() * Math.PI * 2;
          const resetRadius = 2 + Math.random() * 3;
          positions[idx] = Math.cos(resetAngle) * resetRadius;
          positions[idx + 1] = Math.sin(resetAngle) * resetRadius;
        } else {
          positions[idx] = Math.cos(angle + 0.02) * newRadius;
          positions[idx + 1] = Math.sin(angle + 0.02) * newRadius;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  return (
    <group position={position}>
      {/* Base/pedestal */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[2.5, 3, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Main ring structure */}
      <group position={[0, 3, 0]}>
        {/* Outer ring */}
        <mesh ref={ringRef} onClick={handleClick}>
          <torusGeometry args={[2.5, 0.25, 16, 64]} />
          <meshStandardMaterial
            color="#2d2d2d"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Inner decorative ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[2.2, 0.1, 8, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Glyphs ring */}
        <group ref={glyphsRef}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0.2]}
              >
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={isSelected ? 1 : 0.3}
                />
              </mesh>
            );
          })}
        </group>

        {/* Event horizon (portal surface) */}
        <mesh ref={eventHorizonRef} onClick={handleClick}>
          <circleGeometry args={[2, 64]} />
          <meshBasicMaterial
            color="#1a1a2e"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glow effect behind event horizon */}
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[2.3, 64]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={isSelected ? 0.4 : 0.2}
          />
        </mesh>

        {/* Particles spiraling in */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
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

        {/* Point light for glow */}
        <pointLight
          color="#FFD700"
          intensity={isSelected ? 3 : 1}
          distance={10}
        />
      </group>

      {/* Label */}
      <Html position={[0, 6, 0]} center distanceFactor={15}>
        <div
          onClick={handleClick}
          style={{
            color: isSelected ? '#FFD700' : '#ffffff',
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

export default StargatePortal;
