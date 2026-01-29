import { useStore } from '../../store/useStore';

export function PortalPrompt() {
  const { nearPortal, isEnteringPortal } = useStore();

  if (!nearPortal || isEnteringPortal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="text-center animate-pulse">
        {/* Portal name */}
        <div
          className="text-yellow-500 text-xl mb-3 tracking-wider"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {nearPortal.title}
        </div>

        {/* Press E prompt */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
            <span
              className="text-yellow-500 text-2xl font-bold"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              E
            </span>
          </div>
          <span
            className="text-white text-lg tracking-widest"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            PER ENTRARE
          </span>
        </div>

        {/* Decorative line */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-500" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
          <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-yellow-500" />
        </div>
      </div>
    </div>
  );
}

export default PortalPrompt;
