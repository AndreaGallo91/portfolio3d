import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export function LoadingScreen() {
  const { isLoading } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Start fade out animation
      setIsFading(true);
      // Remove from DOM after fade completes
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Logo */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div
          className="w-28 h-28 rounded-full border-2 border-yellow-500/40 animate-spin"
          style={{ animationDuration: '3s' }}
        >
          <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-yellow-500 rounded-full" />
        </div>

        {/* Inner ring */}
        <div
          className="absolute inset-3 rounded-full border-2 border-white/20 animate-spin"
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        >
          <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 mb-[-4px] bg-white rounded-full" />
        </div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span
              className="text-yellow-500 text-lg"
              style={{ fontFamily: 'monospace' }}
            >
              {'{'}
            </span>
            <span
              className="text-2xl font-bold text-white mx-1"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              51
            </span>
            <span
              className="text-yellow-500 text-lg"
              style={{ fontFamily: 'monospace' }}
            >
              {'}'}
            </span>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <span
            className="text-xl font-bold text-white tracking-widest"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            SPACE
          </span>
          <span className="text-xl font-bold text-yellow-500 mx-2" style={{ fontFamily: 'monospace' }}>
            {'{ 51 }'}
          </span>
        </div>
        <p className="text-gray-500 text-sm tracking-wider">
          Atterraggio sulla luna in corso...
        </p>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-56 h-1 bg-gray-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-white"
          style={{
            animation: 'loading-bar 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Stars decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; margin-left: 0; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
