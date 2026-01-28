import { useStore } from '../../store/useStore';

export function ProjectPanel() {
  const { selectedProject, clearSelectedProject } = useStore();

  if (!selectedProject) return null;

  return (
    <div className="info-panel animate-slide-in">
      <div className="glass rounded-2xl p-6 glow-purple relative">
        {/* Close button */}
        <button
          onClick={clearSelectedProject}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-purple-700/50 transition-colors text-gray-200"
          aria-label="Chiudi pannello"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Project color indicator */}
        <div
          className="w-full h-1 rounded-full mb-4"
          style={{ backgroundColor: selectedProject.color }}
        />

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-3"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: selectedProject.color,
          }}
        >
          {selectedProject.title}
        </h2>

        {/* Description */}
        <p className="text-gray-300 mb-4 leading-relaxed">
          {selectedProject.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-gray-700/60 text-gray-200 border border-purple-700/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          {selectedProject.github && (
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-purple-700/40 transition-colors border border-purple-700/40 text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}

          {selectedProject.demo && (
            <a
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border text-gray-200"
              style={{
                backgroundColor: selectedProject.color + '20',
                borderColor: selectedProject.color + '60',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPanel;
