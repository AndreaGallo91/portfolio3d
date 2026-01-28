import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';
import SpaceRoom from './SpaceRoom';
import ProjectObject from './ProjectObject';
import Lights from './Lights';

function Scene() {
  const { setIsLoading } = useStore();

  useEffect(() => {
    // Scene loaded
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={60} />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minPolarAngle={0.3}
        target={[0, 1, 0]}
      />

      {/* Lights */}
      <Lights />

      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#0a0a0f', 15, 40]} />

      {/* Background stars */}
      <Stars
        radius={50}
        depth={50}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Room */}
      <SpaceRoom />

      {/* Project Objects */}
      {projects.map((project) => (
        <ProjectObject key={project.id} project={project} />
      ))}
    </>
  );
}

export function Experience() {
  const { setIsMobile } = useStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0f');
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Experience;
