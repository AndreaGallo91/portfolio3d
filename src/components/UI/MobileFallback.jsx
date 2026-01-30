import { useState } from 'react';
import { projects, spaceInfo } from '../../data/projects';

export function MobileFallback() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

      {/* Header */}
      <header className="relative text-center py-8 px-4 border-b border-yellow-500/20">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span
            className="text-yellow-500 text-2xl"
            style={{ fontFamily: 'monospace' }}
          >
            {'{'}
          </span>
          <span
            className="text-4xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            51
          </span>
          <span
            className="text-yellow-500 text-2xl"
            style={{ fontFamily: 'monospace' }}
          >
            {'}'}
          </span>
        </div>

        <h1
          className="text-2xl font-bold tracking-widest text-yellow-500 mb-1"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          SPACE 51
        </h1>
        <p className="text-gray-400 text-sm">{spaceInfo.subtitle}</p>

        {/* Decorative line */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-500" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-yellow-500" />
        </div>
      </header>

      {/* Projects */}
      <div className="relative p-4 space-y-4 max-w-lg mx-auto">
        <h2
          className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 text-center"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Progetti
        </h2>

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Footer / Socials */}
      <footer className="relative text-center py-8 px-4 mt-4 border-t border-yellow-500/20">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href={spaceInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={spaceInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={`mailto:${spaceInfo.socials.email}`}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
        <p className="text-gray-600 text-xs">
          {spaceInfo.author} • Space 51 Portfolio
        </p>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, onSelect }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-yellow-500/30 bg-gray-900/80 backdrop-blur"
      onClick={onSelect}
    >
      {/* Color bar */}
      <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />

      <div className="p-4">
        {/* Title */}
        <h3
          className="text-lg font-bold text-yellow-500 mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-300 border border-yellow-500/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800 text-gray-500">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Tap indicator */}
      <div className="absolute top-3 right-3">
        <svg className="w-5 h-5 text-yellow-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    </div>
  );
}

// Project Modal Component
function ProjectModal({ project, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasScreenshots = project.screenshots?.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
        <h2
          className="text-lg font-bold text-yellow-500"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {project.title}
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Screenshots */}
        {hasScreenshots && (
          <div className="relative rounded-xl overflow-hidden bg-gray-900 mb-4 aspect-video">
            <img
              src={project.screenshots[currentSlide]}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%231a1a1a" width="400" height="300"/><text fill="%23666" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="14">Screenshot</text></svg>';
              }}
            />

            {/* Slide indicators */}
            {project.screenshots.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-yellow-500 w-4' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm rounded-full bg-gray-800 text-gray-300 border border-yellow-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-yellow-500/20 space-y-2">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            VAI ALLA DEMO LIVE
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Codice su GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export default MobileFallback;
