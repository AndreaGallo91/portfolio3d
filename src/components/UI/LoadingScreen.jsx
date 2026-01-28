import { useStore } from '../../store/useStore';

export function LoadingScreen() {
  const { isLoading } = useStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-gray-950 flex flex-col items-center justify-center">
      {/* Animated Logo */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div
          className="w-24 h-24 rounded-full border-2 border-purple-700/30 animate-spin"
          style={{ animationDuration: '3s' }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-purple-600 rounded-full" />
        </div>

        {/* Inner ring */}
        <div
          className="absolute inset-2 rounded-full border-2 border-cyan-500/30 animate-spin"
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        >
          <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 mb-[-4px] bg-cyan-400 rounded-full" />
        </div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-bold text-gray-100"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            51
          </span>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center text-gray-100">
        <h2
          className="text-xl font-bold mb-2 tracking-widest"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          SPACE 51
        </h2>
        <p className="text-gray-400 text-sm tracking-wider">
          Inizializzando spazio 3D...
        </p>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-cyan-400"
          style={{
            animation: 'loading-bar 1.5s ease-in-out infinite',
          }}
        />
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
