import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export function ControlsHint() {
  const { isMobile, showWelcome, setShowWelcome, isLoading } = useStore();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showWelcome, setShowWelcome]);

  // Hide after user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  if (isLoading || !showWelcome || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="glass rounded-xl px-6 py-4 text-center max-w-md">
        <p className="text-gray-200 text-sm mb-2">
          {isMobile
            ? 'Tocca e trascina per esplorare'
            : 'Trascina per ruotare la vista'}
        </p>

        {!isMobile && (
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-cyan-400">
                Scroll
              </kbd>
              <span>Zoom</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-cyan-400">
                Click
              </kbd>
              <span>Seleziona</span>
            </div>
          </div>
        )}

        <p className="text-purple-400 text-xs mt-3 animate-pulse">
          Clicca sugli oggetti per esplorare i progetti
        </p>
      </div>
    </div>
  );
}

export default ControlsHint;
