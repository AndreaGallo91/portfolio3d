import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export function ControlsHint() {
  const { isMobile, showWelcome, setShowWelcome, isLoading } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [showAfterDelay, setShowAfterDelay] = useState(false);

  // Delay showing after loading completes (wait for loading screen fade)
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowAfterDelay(true);
      }, 1000); // Wait 1 second after loading ends
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && showWelcome && showAfterDelay) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showWelcome, setShowWelcome, showAfterDelay]);

  // Hide after user starts moving
  useEffect(() => {
    const handleKey = (e) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        setTimeout(() => setIsVisible(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (isLoading || !showWelcome || !isVisible || !showAfterDelay) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-black/80 backdrop-blur-md rounded-xl px-6 py-4 text-center max-w-lg border border-yellow-500/30">
        <p
          className="text-yellow-500 text-sm mb-3 font-semibold"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {isMobile
            ? 'Esperienza migliore su desktop'
            : 'Clicca per attivare i controlli'}
        </p>

        {!isMobile && (
          <div className="flex items-center justify-center gap-6 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-yellow-500 border border-yellow-500/30">W</kbd>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-yellow-500 border border-yellow-500/30">A</kbd>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-yellow-500 border border-yellow-500/30">S</kbd>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-yellow-500 border border-yellow-500/30">D</kbd>
              </div>
              <span>Muoviti</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Mouse</span>
              <span>Guarda</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-yellow-500 border border-yellow-500/30">E</kbd>
              <span>Entra portale</span>
            </div>
          </div>
        )}

        <p className="text-gray-400 text-xs mt-3">
          Avvicinati ai portali dorati per esplorare i progetti
        </p>
      </div>
    </div>
  );
}

export default ControlsHint;
