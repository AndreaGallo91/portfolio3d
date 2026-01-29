import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export function ProjectRoom() {
  const { inProjectRoom, currentProjectRoom, exitProjectRoom } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in effect
  useEffect(() => {
    if (inProjectRoom) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setCurrentSlide(0);
    }
  }, [inProjectRoom]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!inProjectRoom || !currentProjectRoom?.screenshots?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        (prev + 1) % currentProjectRoom.screenshots.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [inProjectRoom, currentProjectRoom]);

  if (!inProjectRoom || !currentProjectRoom) return null;

  const hasScreenshots = currentProjectRoom.screenshots?.length > 0;

  return (
    <div
      className={`fixed inset-0 z-[150] bg-black transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
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

      {/* Main content container */}
      <div className="relative h-full flex flex-col md:flex-row p-4 md:p-8 gap-6 max-w-7xl mx-auto">
        {/* Left side - Slideshow */}
        <div className="flex-1 flex flex-col">
          {/* Slideshow container */}
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-yellow-500/30 bg-gray-900/50 backdrop-blur">
            {hasScreenshots ? (
              <>
                {/* Current slide */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={currentProjectRoom.screenshots[currentSlide]}
                    alt={`${currentProjectRoom.title} screenshot ${currentSlide + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%231a1a1a" width="400" height="300"/><text fill="%23666" x="50%" y="50%" text-anchor="middle" dy=".3em">Screenshot non disponibile</text></svg>';
                    }}
                  />
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {currentProjectRoom.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'bg-yellow-500 w-6'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation arrows */}
                {currentProjectRoom.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentSlide(
                          (prev) =>
                            (prev - 1 + currentProjectRoom.screenshots.length) %
                            currentProjectRoom.screenshots.length
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500/30 flex items-center justify-center transition-colors border border-yellow-500/30"
                    >
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlide(
                          (prev) =>
                            (prev + 1) % currentProjectRoom.screenshots.length
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500/30 flex items-center justify-center transition-colors border border-yellow-500/30"
                    >
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Screenshots in arrivo...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Project info */}
        <div className="w-full md:w-96 flex flex-col">
          {/* Header with back button */}
          <div className="mb-6">
            <button
              onClick={exitProjectRoom}
              className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors mb-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TORNA SULLA LUNA
              </span>
            </button>

            {/* Project color indicator */}
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {currentProjectRoom.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {currentProjectRoom.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3
              className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProjectRoom.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm rounded-full bg-gray-800/80 text-gray-300 border border-yellow-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {currentProjectRoom.demo && (
              <a
                href={currentProjectRoom.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 transition-all text-black font-bold text-lg"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                VAI ALLA DEMO LIVE
              </a>
            )}

            {currentProjectRoom.github && (
              <a
                href={currentProjectRoom.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 text-gray-300 hover:text-white font-semibold"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Codice su GitHub
              </a>
            )}

            <button
              onClick={exitProjectRoom}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-transparent hover:bg-yellow-500/10 transition-colors border border-yellow-500/30 text-yellow-500 font-semibold mt-2"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
              TORNA SULLA LUNA
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-yellow-500/50" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-yellow-500/50" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-yellow-500/50" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-yellow-500/50" />
    </div>
  );
}

export default ProjectRoom;
