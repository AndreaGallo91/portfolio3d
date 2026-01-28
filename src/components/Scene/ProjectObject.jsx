import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export function ProjectObject({ project }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  const { setSelectedProject, setHoveredObject, selectedProject } = useStore();

  const isSelected = selectedProject?.id === project.id;

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Scale on hover
      const targetScale = hovered || isSelected ? 1.3 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    // Glow intensity
    if (glowRef.current) {
      const intensity = hovered || isSelected ? 3 : 1;
      glowRef.current.intensity = THREE.MathUtils.lerp(
        glowRef.current.intensity,
        intensity,
        0.1
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredObject(project.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredObject(null);
    document.body.style.cursor = 'crosshair';
  };

  // Render different shapes based on project
  const renderShape = () => {
    const materialProps = {
      color: project.color,
      emissive: project.emissiveColor,
      emissiveIntensity: hovered || isSelected ? 1 : 0.4,
      roughness: 0.2,
      metalness: 0.8,
    };

    switch (project.shape) {
      case 'icosahedron':
        return (
          <mesh ref={meshRef} castShadow>
            <icosahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      case 'octahedron':
        return (
          <mesh ref={meshRef} castShadow>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      case 'torusKnot':
        return (
          <mesh ref={meshRef} castShadow>
            <torusKnotGeometry args={[0.5, 0.18, 100, 16]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      case 'dodecahedron':
        return (
          <mesh ref={meshRef} castShadow>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      default:
        return (
          <mesh ref={meshRef} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
    }
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.6}
      position={project.position}
    >
      <group
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Point light for glow effect */}
        <pointLight
          ref={glowRef}
          color={project.color}
          intensity={1}
          distance={6}
        />

        {/* The shape */}
        {renderShape()}

        {/* Label below object using Html */}
        <Html
          position={[0, -1.5, 0]}
          center
          distanceFactor={8}
          style={{
            transition: 'all 0.2s',
            opacity: hovered || isSelected ? 1 : 0.7,
            transform: `scale(${hovered || isSelected ? 1.1 : 1})`,
          }}
        >
          <div
            style={{
              color: hovered || isSelected ? project.color : '#e5e7eb',
              fontSize: '14px',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 'bold',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
              pointerEvents: 'none',
            }}
          >
            {project.title}
          </div>
        </Html>

        {/* Hover indicator ring */}
        {(hovered || isSelected) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
            <ringGeometry args={[1, 1.2, 32]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default ProjectObject;
