import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingRocks() {
  const groupRef = useRef();

  // Generate random rocks
  const rocks = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 30;
      const height = 8 + Math.random() * 15;

      items.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.3 + Math.random() * 1.2,
        speed: 0.1 + Math.random() * 0.3,
        orbitRadius: radius,
        orbitOffset: angle,
        yOffset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    rocks.forEach((rock, i) => {
      if (groupRef.current?.children[i]) {
        const mesh = groupRef.current.children[i];

        // Orbit around the moon
        const angle = rock.orbitOffset + time * rock.speed * 0.1;
        mesh.position.x = Math.cos(angle) * rock.orbitRadius;
        mesh.position.z = Math.sin(angle) * rock.orbitRadius;

        // Gentle vertical bobbing
        mesh.position.y = rock.position[1] + Math.sin(time * rock.speed + rock.yOffset) * 2;

        // Slow rotation
        mesh.rotation.x += rock.speed * 0.01;
        mesh.rotation.y += rock.speed * 0.005;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#3d3d3d' : i % 3 === 1 ? '#2d2d2d' : '#4a4a4a'}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default FloatingRocks;
