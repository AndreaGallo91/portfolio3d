import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export function WarpEffect() {
  const { isEnteringPortal, nearPortal } = useStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isEnteringPortal) {
      setPhase(1);
      const timer1 = setTimeout(() => setPhase(2), 400);
      const timer2 = setTimeout(() => setPhase(3), 900);
      const timer3 = setTimeout(() => setPhase(4), 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setPhase(0);
    }
  }, [isEnteringPortal]);

  if (!isEnteringPortal) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Dark vignette that closes in */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          phase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at center,
            transparent 0%,
            transparent ${phase >= 2 ? '5%' : '30%'},
            rgba(0, 0, 0, 0.3) ${phase >= 2 ? '15%' : '45%'},
            rgba(0, 0, 0, 0.7) ${phase >= 2 ? '30%' : '60%'},
            rgba(0, 0, 0, 0.95) 100%)`,
          transition: 'all 0.5s ease-in',
        }}
      />

      {/* Warp tunnel rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 8 }).map((_, i) => {
          const size = 100 + i * 80;
          const delay = i * 0.08;
          return (
            <div
              key={i}
              className={`absolute rounded-full border-2 transition-all ${
                phase >= 1 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: i % 2 === 0 ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                animation: phase >= 1 ? `tunnel-ring 1s ease-in ${delay}s forwards` : 'none',
                boxShadow: i % 2 === 0 ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Streaking stars/light beams */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * 360;
          const distance = 20 + Math.random() * 30;
          const length = 50 + Math.random() * 150;
          const delay = Math.random() * 0.3;
          const thickness = 1 + Math.random() * 2;
          return (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 origin-left ${
                phase >= 1 ? '' : 'hidden'
              }`}
              style={{
                transform: `rotate(${angle}deg) translateX(${distance}px)`,
              }}
            >
              <div
                className="bg-gradient-to-r from-yellow-400 via-white to-transparent"
                style={{
                  width: '0px',
                  height: `${thickness}px`,
                  animation: phase >= 1 ? `streak-extend 0.6s ease-out ${delay}s forwards` : 'none',
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
                  '--streak-length': `${length}px`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Central wormhole */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          phase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Outer glow ring */}
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(255, 215, 0, 0.4) 60%, rgba(255, 215, 0, 0.8) 70%, transparent 100%)',
            animation: phase >= 1 ? 'portal-pulse 0.3s ease-in-out infinite' : 'none',
          }}
        />

        {/* Inner dark void */}
        <div
          className={`absolute inset-4 rounded-full transition-all duration-500 ${
            phase >= 2 ? 'scale-150' : 'scale-100'
          }`}
          style={{
            background: 'radial-gradient(circle, #000 0%, #000 60%, rgba(255, 215, 0, 0.3) 80%, transparent 100%)',
            boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.8)',
          }}
        />

        {/* Spinning edge particles */}
        <div
          className="absolute inset-0"
          style={{
            animation: phase >= 1 ? 'spin-slow 1s linear infinite' : 'none',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateX(60px) translateY(-50%)`,
                  boxShadow: '0 0 10px rgba(255, 215, 0, 1)',
                  opacity: 0.8,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Particles being sucked in */}
      <div className={`absolute inset-0 ${phase >= 1 ? '' : 'hidden'}`}>
        {Array.from({ length: 40 }).map((_, i) => {
          const startAngle = Math.random() * 360;
          const startDistance = 100 + Math.random() * 400;
          const delay = Math.random() * 0.6;
          const size = 2 + Math.random() * 4;
          return (
            <div
              key={`particle-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#ffffff' : '#ffaa00',
                transform: `rotate(${startAngle}deg) translateX(${startDistance}px)`,
                animation: `spiral-in 0.8s ease-in ${delay}s forwards`,
                boxShadow: '0 0 6px currentColor',
              }}
            />
          );
        })}
      </div>

      {/* Final flash to white then black */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-200 ${
          phase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Text */}
      {nearPortal && (
        <div
          className={`absolute left-1/2 bottom-1/4 -translate-x-1/2 text-center transition-all duration-500 ${
            phase >= 1 && phase < 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            className="text-yellow-500 text-2xl font-bold tracking-[0.3em] mb-2"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.5)',
              animation: phase >= 1 ? 'text-glitch 0.1s infinite' : 'none',
            }}
          >
            WARPING
          </div>
          <div
            className="text-white/80 text-sm tracking-widest"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {nearPortal.title}
          </div>
        </div>
      )}

      <style>{`
        @keyframes tunnel-ring {
          0% {
            transform: scale(1) translateZ(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) translateZ(100px);
            opacity: 0;
          }
        }

        @keyframes streak-extend {
          0% { width: 0px; opacity: 0; }
          20% { opacity: 1; }
          100% { width: var(--streak-length); opacity: 0; }
        }

        @keyframes portal-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spiral-in {
          0% {
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--start-angle, 0deg) + 720deg)) translateX(0px) scale(0);
            opacity: 0;
          }
        }

        @keyframes text-glitch {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

export default WarpEffect;
