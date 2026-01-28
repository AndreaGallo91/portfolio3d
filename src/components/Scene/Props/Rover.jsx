import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Rover({ position = [0, 0, 0] }) {
  const wheelRefs = useRef([]);
  const antennaRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Antenna sway
    if (antennaRef.current) {
      antennaRef.current.rotation.x = Math.sin(time * 2) * 0.05;
      antennaRef.current.rotation.z = Math.cos(time * 1.5) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 0.4, 1]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Top equipment box */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Solar panel */}
      <mesh position={[0, 1, 0]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a4a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Antenna */}
      <group ref={antennaRef} position={[0.5, 1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#3d3d3d" metalness={0.8} />
        </mesh>
        {/* Antenna dish */}
        <mesh position={[0, 0.5, 0]} rotation={[0.5, 0, 0]}>
          <coneGeometry args={[0.15, 0.1, 16, 1, true]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.3}
            side={2}
          />
        </mesh>
      </group>

      {/* Wheels */}
      {[
        [-0.6, 0.2, 0.5],
        [0.6, 0.2, 0.5],
        [-0.6, 0.2, -0.5],
        [0.6, 0.2, -0.5],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
          ref={(el) => (wheelRefs.current[i] = el)}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}

      {/* Camera/sensor */}
      <mesh position={[0.7, 0.7, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Camera lens */}
      <mesh position={[0.7, 0.7, 0.45]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Headlights */}
      <pointLight
        position={[0.7, 0.5, 0.6]}
        color="#FFD700"
        intensity={0.3}
        distance={5}
      />
    </group>
  );
}

export default Rover;
