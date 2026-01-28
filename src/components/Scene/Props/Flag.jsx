import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Flag({ position = [0, 0, 0] }) {
  const flagRef = useRef();

  // Create wavy flag geometry
  const flagGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1.2, 0.8, 20, 10);
    return geometry;
  }, []);

  useFrame((state) => {
    if (flagRef.current) {
      const time = state.clock.elapsedTime;
      const positions = flagRef.current.geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // Wave effect - stronger towards the end of flag
        const waveX = Math.sin(time * 2 + x * 3) * 0.05 * (x + 0.6);
        const waveY = Math.cos(time * 1.5 + x * 2) * 0.02 * (x + 0.6);

        positions.setZ(i, waveX + waveY);
      }

      positions.needsUpdate = true;
      flagRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pole top */}
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
          metalness={0.9}
        />
      </mesh>

      {/* Horizontal support */}
      <mesh position={[0.55, 2.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.8} />
      </mesh>

      {/* Flag fabric */}
      <mesh
        ref={flagRef}
        position={[0.6, 2.5, 0]}
        geometry={flagGeometry}
        castShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flag design - SPACE 51 text representation */}
      <group position={[0.6, 2.5, 0.01]}>
        {/* "51" numbers */}
        <mesh position={[0, 0.1, 0]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Brackets { } */}
        <mesh position={[-0.35, 0.1, 0.01]}>
          <planeGeometry args={[0.15, 0.35]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.35, 0.1, 0.01]}>
          <planeGeometry args={[0.15, 0.35]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
        </mesh>

        {/* Decorative line */}
        <mesh position={[0, -0.2, 0]}>
          <planeGeometry args={[0.8, 0.03]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      </group>

      {/* Base/stand */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.2, 8]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default Flag;
