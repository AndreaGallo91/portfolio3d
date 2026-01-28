import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../store/useStore';

export function RiftPortal({ project, position = [0, 0, 0] }) {
  const riftRef = useRef();
  const glowRef = useRef();
  const particlesRef = useRef();
  const lightningRef = useRef();

  const { setSelectedProject, selectedProject } = useStore();
  const isSelected = selectedProject?.id === project.id;

  // Lightning bolts positions
  const lightningPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5; i++) {
      positions.push({
        start: [(Math.random() - 0.5) * 0.5, -2 + i * 1, 0],
        mid: [(Math.random() - 0.5) * 1, -1.5 + i * 1, (Math.random() - 0.5) * 0.5],
        end: [(Math.random() - 0.5) * 0.5, -1 + i * 1, 0],
      });
    }
    return positions;
  }, []);

  // Particles escaping from rift
  const particleCount = 150;
  const particleData = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const velocities = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = Math.random() * 4 - 1;
      pos[i * 3 + 2] = Math.random() * 2;
      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.02,
        z: 0.02 + Math.random() * 0.05,
      });
    }
    return { positions: pos, velocities };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rift pulsing
    if (riftRef.current) {
      riftRef.current.scale.x = 1 + Math.sin(time * 3) * 0.1;
      riftRef.current.scale.y = 1 + Math.cos(time * 2) * 0.05;
    }

    // Glow pulsing
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(time * 4) * 0.2;
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const vel = particleData.velocities[i];

        positions[idx] += vel.x;
        positions[idx + 1] += vel.y;
        positions[idx + 2] += vel.z;

        // Reset if too far
        if (positions[idx + 2] > 5) {
          positions[idx] = (Math.random() - 0.5) * 0.5;
          positions[idx + 1] = Math.random() * 4 - 1;
          positions[idx + 2] = 0;
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
      {/* Ground crack effect */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 4]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main rift - vertical crack */}
      <group position={[0, 2, 0]}>
        {/* Rift shape (jagged line) */}
        <mesh ref={riftRef} onClick={handleClick}>
          <planeGeometry args={[0.8, 4]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Dark center */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.3, 3.5]} />
          <meshBasicMaterial
            color="#000000"
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} position={[0, 0, -0.1]}>
          <planeGeometry args={[2, 5]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Distortion rings */}
        {[1, 1.5, 2, 2.5].map((radius, i) => (
          <mesh key={i} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[radius, 0.02, 8, 32]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.3 - i * 0.05}
            />
          </mesh>
        ))}

        {/* Particles escaping */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particleData.positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color="#FFD700"
            transparent
            opacity={0.7}
            sizeAttenuation
          />
        </points>

        {/* Light source */}
        <pointLight
          color="#FFD700"
          intensity={isSelected ? 4 : 2}
          distance={15}
        />

        {/* Secondary light for dramatic effect */}
        <spotLight
          color="#ffffff"
          intensity={isSelected ? 2 : 0.5}
          distance={20}
          angle={0.5}
          penumbra={1}
          position={[0, 0, 2]}
        />
      </group>

      {/* Label */}
      <Html position={[0, 5, 0]} center distanceFactor={15}>
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

export default RiftPortal;
