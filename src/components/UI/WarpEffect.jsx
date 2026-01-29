import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export function WarpEffect() {
  const { isEnteringPortal, nearPortal } = useStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isEnteringPortal) {
      setPhase(1);
      const timer1 = setTimeout(() => setPhase(2), 500);
      const timer2 = setTimeout(() => setPhase(3), 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setPhase(0);
    }
  }, [isEnteringPortal]);

  if (!isEnteringPortal) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Radial warp lines */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          phase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(255, 215, 0, 0.1) 40%, rgba(255, 215, 0, 0.3) 60%, rgba(255, 215, 0, 0.5) 80%, rgba(255, 215, 0, 0.8) 100%)`,
        }}
      />

      {/* Speed lines animation */}
      <div className={`absolute inset-0 ${phase >= 1 ? 'animate-warp-lines' : ''}`}>
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * 360;
          const delay = Math.random() * 0.3;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 origin-center"
              style={{
                transform: `rotate(${angle}deg)`,
                animation: phase >= 1 ? `warp-line 0.8s ease-in ${delay}s forwards` : 'none',
              }}
            >
              <div
                className="w-1 bg-gradient-to-b from-transparent via-yellow-500 to-white"
                style={{
                  height: '0px',
                  marginTop: '-50vh',
                  animation: phase >= 1 ? `line-extend 0.6s ease-out ${delay}s forwards` : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Central vortex */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
          phase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Outer ring */}
        <div
          className={`w-64 h-64 rounded-full border-4 border-yellow-500 ${
            phase >= 1 ? 'animate-spin-fast' : ''
          }`}
          style={{
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.8), inset 0 0 40px rgba(255, 215, 0, 0.4)',
          }}
        />

        {/* Middle ring */}
        <div
          className={`absolute inset-8 rounded-full border-2 border-white ${
            phase >= 1 ? 'animate-spin-reverse' : ''
          }`}
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6)',
          }}
        />

        {/* Inner core */}
        <div
          className={`absolute inset-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 ${
            phase >= 2 ? 'animate-pulse-fast' : ''
          }`}
          style={{
            boxShadow: '0 0 50px rgba(255, 215, 0, 1)',
          }}
        />
      </div>

      {/* Suction particles */}
      <div className={`absolute inset-0 ${phase >= 1 ? '' : 'hidden'}`}>
        {Array.from({ length: 30 }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const delay = Math.random() * 0.5;
          return (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-yellow-500 rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                animation: `suction-particle 0.8s ease-in ${delay}s forwards`,
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
              }}
            />
          );
        })}
      </div>

      {/* Flash effect on entering */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 ${
          phase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Text */}
      {nearPortal && (
        <div
          className={`absolute left-1/2 top-1/4 -translate-x-1/2 text-center transition-all duration-500 ${
            phase >= 1 && phase < 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div
            className="text-yellow-500 text-3xl font-bold tracking-widest"
            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}
          >
            ENTERING
          </div>
          <div
            className="text-white text-xl mt-2 tracking-wider"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {nearPortal.title}
          </div>
        </div>
      )}

      <style>{`
        @keyframes warp-line {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes line-extend {
          0% { height: 0px; }
          100% { height: 50vh; }
        }

        @keyframes suction-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(50vw - 100%), calc(50vh - 100%)) scale(0);
            opacity: 0;
          }
        }

        .animate-spin-fast {
          animation: spin 0.5s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 0.7s linear infinite reverse;
        }

        .animate-pulse-fast {
          animation: pulse 0.2s ease-in-out infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

export default WarpEffect;
