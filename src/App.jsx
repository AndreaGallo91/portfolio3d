import { useEffect, useState } from 'react';
import { Experience } from './components/Scene';
import {
  ProjectPanel,
  Header,
  LoadingScreen,
  ControlsHint,
  MobileFallback,
  PortalPrompt,
  WarpEffect,
  ProjectRoom,
} from './components/UI';
import { useStore } from './store/useStore';

function App() {
  const { isMobile, setIsMobile, inProjectRoom } = useStore();
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Check for mobile and WebGL support
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      // Use fallback on very small screens or no WebGL
      if (!gl || window.innerWidth < 480) {
        setUseFallback(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [setIsMobile]);

  // Mobile fallback for very small devices
  if (useFallback) {
    return <MobileFallback />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-space-dark">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Header - hide when in project room */}
      {!inProjectRoom && <Header />}

      {/* 3D Experience */}
      <Experience />

      {/* Project Info Panel (legacy - keeping for click interactions) */}
      <ProjectPanel />

      {/* Portal Prompt - shows when near a portal */}
      <PortalPrompt />

      {/* Warp Effect - shows when entering portal */}
      <WarpEffect />

      {/* Project Room - fullscreen overlay when inside portal */}
      <ProjectRoom />

      {/* Controls Hint - hide when in project room */}
      {!inProjectRoom && <ControlsHint />}
    </div>
  );
}

export default App;
