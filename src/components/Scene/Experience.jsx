import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';
import SpaceRoom from './SpaceRoom';
import ProjectObject from './ProjectObject';
import Lights from './Lights';

function Scene() {
  const { setIsLoading, selectedProject, clearSelectedProject, isMobile } = useStore();

  useEffect(() => {
    // Simula il caricamento
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Click on empty space to deselect
  const handleCanvasClick = (e) => {
    // Only clear if clicking on the floor/background
    if (e.object.type === 'Mesh' && !e.object.userData.isProject) {
      clearSelectedProject();
    }
  };

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minPolarAngle={0.2}
        target={[0, 1, 0]}
        // Touch settings for mobile
        touches={{
          ONE: 1, // TOUCH.ROTATE
          TWO: 2, // TOUCH.DOLLY_PAN
        }}
      />

      {/* Lights */}
      <Lights />

      {/* Environment */}
      <fog attach="fog" args={['#0a0a0f', 10, 30]} />

      {/* Room */}
      <SpaceRoom />

      {/* Project Objects */}
      {projects.map((project) => (
        <ProjectObject key={project.id} project={project} />
      ))}

      {/* Post-processing effects */}
      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      )}
    </>
  );
}

export function Experience() {
  const { isMobile, setIsMobile } = useStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        shadows
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0f');
        }}
      >
        <PerformanceMonitor
          onDecline={() => {
            // Reduce quality if performance drops
          }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

export default Experience;
