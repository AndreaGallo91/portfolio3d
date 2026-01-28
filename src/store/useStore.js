import { create } from 'zustand';

export const useStore = create((set) => ({
  // Selected project
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearSelectedProject: () => set({ selectedProject: null }),

  // UI state
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Mobile detection
  isMobile: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),

  // Controls enabled
  controlsEnabled: true,
  setControlsEnabled: (enabled) => set({ controlsEnabled: enabled }),

  // Hovered object
  hoveredObject: null,
  setHoveredObject: (object) => set({ hoveredObject: object }),

  // Camera position for reset
  initialCameraPosition: [0, 2, 8],

  // Show welcome message
  showWelcome: true,
  setShowWelcome: (show) => set({ showWelcome: show }),
}));
