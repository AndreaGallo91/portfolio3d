import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Antenna({ position = [0, 0, 0] }) {
  const dishRef = useRef();
  const lightRef = useRef();
  const beaconRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Slow dish rotation
    if (dishRef.current) {
      dishRef.current.rotation.y = time * 0.2;
    }

    // Blinking beacon light
    if (lightRef.current) {
      lightRef.current.intensity = Math.sin(time * 4) > 0.5 ? 2 : 0.2;
    }

    // Beacon visual
    if (beaconRef.current) {
      beaconRef.current.material.emissiveIntensity = Math.sin(time * 4) > 0.5 ? 1 : 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Main tower structure - lattice style */}
      <group>
        {/* Four corner poles */}
        {[
          [-0.3, 0, -0.3],
          [0.3, 0, -0.3],
          [-0.3, 0, 0.3],
          [0.3, 0, 0.3],
        ].map((pos, i) => (
          <mesh key={i} position={[pos[0], 4, pos[2]]} castShadow>
            <cylinderGeometry args={[0.05, 0.08, 8, 8]} />
            <meshStandardMaterial color="#2d2d2d" roughness={0.7} metalness={0.5} />
          </mesh>
        ))}

        {/* Cross braces */}
        {[2, 4, 6].map((y, i) => (
          <group key={i} position={[0, y, 0]}>
            {/* Horizontal frame */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
              <meshStandardMaterial color="#3d3d3d" metalness={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
              <meshStandardMaterial color="#3d3d3d" metalness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Satellite dish */}
      <group ref={dishRef} position={[0, 6, 0]}>
        {/* Dish */}
        <mesh rotation={[0.5, 0, 0]} castShadow>
          <coneGeometry args={[1, 0.4, 32, 1, true]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
            side={2}
          />
        </mesh>

        {/* Dish inner */}
        <mesh rotation={[0.5, 0, 0]} position={[0, 0.05, 0.1]}>
          <coneGeometry args={[0.9, 0.3, 32, 1, true]} />
          <meshStandardMaterial
            color="#2d2d2d"
            roughness={0.5}
            metalness={0.5}
            side={2}
          />
        </mesh>

        {/* Feed horn */}
        <mesh position={[0, 0.3, 0.5]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>

        {/* Support arm */}
        <mesh position={[0, 0.15, 0.25]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#3d3d3d" metalness={0.7} />
        </mesh>
      </group>

      {/* Top beacon */}
      <mesh ref={beaconRef} position={[0, 8.2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Beacon light */}
      <pointLight
        ref={lightRef}
        position={[0, 8.2, 0]}
        color="#FFD700"
        intensity={2}
        distance={20}
      />

      {/* Base platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Equipment boxes */}
      <mesh position={[0.4, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
      </mesh>
      <mesh position={[-0.4, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default Antenna;
