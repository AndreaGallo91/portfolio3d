import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';

// Environment
import { MoonTerrain, SpaceSky } from './Environment';

// Portals
import { StargatePortal, RiftPortal, MonolithPortal, CrystalPortal } from './Portals';

// Props
import { Rover, Flag, Antenna, FloatingRocks } from './Props';

// Controls
import FirstPersonControls from './FirstPersonControls';

// Lights
import Lights from './Lights';

function Scene() {
  const { setIsLoading } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Render portal based on type
  const renderPortal = (project) => {
    switch (project.portalType) {
      case 'stargate':
        return (
          <StargatePortal
            key={project.id}
            project={project}
            position={project.position}
          />
        );
      case 'rift':
        return (
          <RiftPortal
            key={project.id}
            project={project}
            position={project.position}
          />
        );
      case 'monolith':
        return (
          <MonolithPortal
            key={project.id}
            project={project}
            position={project.position}
          />
        );
      case 'crystal':
        return (
          <CrystalPortal
            key={project.id}
            project={project}
            position={project.position}
          />
        );
      default:
        return (
          <CrystalPortal
            key={project.id}
            project={project}
            position={project.position}
          />
        );
    }
  };

  return (
    <>
      {/* First Person Controls */}
      <FirstPersonControls />

      {/* Lights */}
      <Lights />

      {/* Fog for atmosphere - darker, more space-like */}
      <fog attach="fog" args={['#0a0a0a', 30, 80]} />

      {/* Space Sky with planets and stars */}
      <SpaceSky />

      {/* Moon terrain */}
      <MoonTerrain />

      {/* Project Portals */}
      {projects.map((project) => renderPortal(project))}

      {/* Props */}
      <Rover position={[5, 0, 8]} />
      <Flag position={[-3, 0, 6]} />
      <Antenna position={[12, 0, -8]} />
      <FloatingRocks />
    </>
  );
}

export function Experience() {
  const { setIsMobile, isMobile, inProjectRoom } = useStore();
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  const handleCanvasClick = () => {
    setShowInstructions(false);
  };

  return (
    <div
      className="canvas-container"
      onClick={handleCanvasClick}
      style={{ pointerEvents: inProjectRoom ? 'none' : 'auto' }}
    >
      {/* Instructions overlay */}
      {showInstructions && !isMobile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl px-8 py-6 text-center border border-yellow-500/30">
            <p className="text-yellow-500 text-lg font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CLICCA PER ENTRARE
            </p>
            <p className="text-gray-400 text-sm">
              WASD per muoverti | Mouse per guardarti attorno
            </p>
            <p className="text-gray-500 text-xs mt-2">
              ESC per uscire dalla modalità | Clicca sui portali per i progetti
            </p>
          </div>
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050505');
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
