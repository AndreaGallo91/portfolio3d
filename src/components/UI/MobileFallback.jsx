import { projects, spaceInfo } from '../../data/projects';

export function MobileFallback() {
  return (
    <div className="min-h-screen bg-space-dark p-4 overflow-y-auto">
      {/* Header */}
      <header className="text-center py-8 mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-space-purple to-space-cyan flex items-center justify-center glow-purple">
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            51
          </span>
        </div>
        <h1
          className="text-3xl font-bold tracking-wider mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {spaceInfo.title}
        </h1>
        <p className="text-space-light/60">{spaceInfo.subtitle}</p>
      </header>

      {/* Projects Grid */}
      <div className="space-y-6 max-w-lg mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass rounded-2xl p-6"
            style={{ borderColor: project.color + '40' }}
          >
            {/* Color indicator */}
            <div
              className="w-full h-1 rounded-full mb-4"
              style={{ backgroundColor: project.color }}
            />

            {/* Title */}
            <h2
              className="text-xl font-bold mb-3"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: project.color,
              }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-space-light/80 mb-4 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-space-gray/60 text-space-light/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-space-gray text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: project.color + '20',
                    borderColor: project.color,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Socials */}
      <footer className="text-center py-8 mt-8">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href={spaceInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-space-light/60 hover:text-space-cyan"
          >
            GitHub
          </a>
          <a
            href={spaceInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-space-light/60 hover:text-space-cyan"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${spaceInfo.socials.email}`}
            className="text-space-light/60 hover:text-space-cyan"
          >
            Email
          </a>
        </div>
        <p className="text-space-light/40 text-sm">
          {spaceInfo.author} - Space 51 Portfolio
        </p>
      </footer>
    </div>
  );
}

export default MobileFallback;
