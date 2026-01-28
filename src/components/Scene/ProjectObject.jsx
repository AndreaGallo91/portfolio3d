import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
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
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Scale on hover
      const targetScale = hovered || isSelected ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    // Glow intensity
    if (glowRef.current) {
      const intensity = hovered || isSelected ? 2 : 0.5;
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
      emissiveIntensity: hovered || isSelected ? 0.8 : 0.3,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
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
            <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
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
      rotationIntensity={0.2}
      floatIntensity={0.5}
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
          intensity={0.5}
          distance={5}
        />

        {/* The shape */}
        {renderShape()}

        {/* Label below object */}
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.2}
          color={hovered || isSelected ? project.color : '#e5e7eb'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.02}
          outlineColor="#0a0a0f"
        >
          {project.title}
        </Text>

        {/* Hover indicator ring */}
        {(hovered || isSelected) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
            <ringGeometry args={[0.9, 1.1, 32]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default ProjectObject;
