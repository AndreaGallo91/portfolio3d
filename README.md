# Space{51} Portfolio 3D 🌙

Un portfolio interattivo 3D ambientato sulla Luna. Esplora i progetti camminando sulla superficie lunare e entrando nei portali di cristallo.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://portfolio3d-roan-ten.vercel.app/)
[![Built with React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎮 Demo Live

**[Esplora il Portfolio →](https://portfolio3d-roan-ten.vercel.app/)**

---

## 📸 Screenshots

<div align="center">
  <img src="docs/screenshots/moon-surface.png" alt="Moon Surface" width="400"/>
  <img src="docs/screenshots/crystal-portal.png" alt="Crystal Portal" width="400"/>
</div>

---

## ✨ Funzionalità

- **Esplorazione 3D** — Cammina sulla Luna in prima persona con WASD + mouse
- **Portali di cristallo** — Stalattiti luminose con vene dorate pulsanti
- **Effetto warp** — Animazione wormhole quando entri in un portale
- **Project Room** — Visualizza dettagli progetto con slideshow screenshot
- **Navigazione progetti** — Passa da un progetto all'altro senza tornare alla Luna
- **Ambiente spaziale** — Cielo stellato, pianeti colorati, meteoriti orbitanti
- **Mobile responsive** — Versione 2D ottimizzata per dispositivi touch

---

## 🛠️ Tech Stack

| Tecnologia | Utilizzo |
|------------|----------|
| **React 18** | UI Components & State Management |
| **Three.js** | Rendering 3D |
| **React Three Fiber** | React wrapper per Three.js |
| **@react-three/drei** | Helpers e componenti 3D |
| **Zustand** | State management globale |
| **Vite** | Build tool & Dev Server |
| **Tailwind CSS** | Styling UI 2D |
| **Vercel** | Hosting & Deploy |

---

## 🚀 Installazione Locale

```bash
# Clona il repository
git clone https://github.com/AndreaGallo91/portfolio3d.git

# Entra nella cartella
cd portfolio3d

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) nel browser.

### Altri comandi

```bash
# Build per produzione
npm run build

# Preview della build
npm run preview
```

---

## 🎮 Controlli

| Azione | Desktop | Mobile |
|--------|---------|--------|
| **Muoversi** | W A S D | N/A (versione 2D) |
| **Guardarsi intorno** | Mouse | N/A |
| **Entrare nel portale** | E (quando vicino) | Tap su card |
| **Uscire dal progetto** | Pulsante UI | Pulsante UI |

---

## 📁 Struttura Progetto

```
portfolio3d/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── public/
│   ├── favicon.svg
│   └── projects/           # Screenshot progetti
│       ├── quiz-game/
│       ├── data-glance/
│       ├── procedural-facade-generator/
│       └── freelance-manager/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Scene/
    │   │   ├── Experience.jsx       # Scene principale
    │   │   ├── FirstPersonControls.jsx
    │   │   ├── Environment/
    │   │   │   ├── MoonTerrain.jsx  # Terreno lunare
    │   │   │   └── SpaceSky.jsx     # Cielo e pianeti
    │   │   └── Portals/
    │   │       └── CrystalPortal.jsx
    │   └── UI/
    │       ├── LoadingScreen.jsx
    │       ├── HUD.jsx
    │       ├── ProjectRoom.jsx      # Dettaglio progetto
    │       ├── WarpEffect.jsx       # Animazione wormhole
    │       ├── PortalPrompt.jsx
    │       └── MobileFallback.jsx   # Versione mobile
    ├── data/
    │   └── projects.js              # Database progetti
    └── store/
        └── useStore.js              # Zustand store
```

---

## 🌙 Progetti Inclusi

1. **Quiz Game Educativo** — Gioco quiz con gamification
2. **Data Glance** — Dashboard visualizzazione dati
3. **Procedural Facade Generator** — Generatore facciate 3D
4. **Freelance Manager** — Gestione progetti freelance

---

## 🤖 Built with AI

Questo progetto è stato sviluppato utilizzando un approccio **AI-assisted development** con [Claude Code](https://claude.ai/code).

### Il mio approccio

Ho utilizzato Claude come **pair programming partner** per:

- **Brainstorming** — Definire il concept "Luna + portali di cristallo"
- **Architettura 3D** — Strutturare componenti Three.js/R3F
- **Sviluppo iterativo** — Implementare feature attraverso conversazioni naturali
- **Problem solving** — Risolvere complessità di pointer lock, warp effects, mobile

### Cosa ho imparato

Il 3D web è complesso. L'AI ha accelerato enormemente:

1. **Tu guidi** — Definisci l'esperienza, lo stile visivo, le interazioni
2. **L'AI accelera** — Implementa shader, geometrie, animazioni
3. **Tu validi** — Testi su device, raffini i dettagli, ottimizzi

Il risultato? Un portfolio 3D immersivo costruito in modo efficiente.

---

## 👤 Autore

**Andrea Gallucci**

- GitHub: [@AndreaGallo91](https://github.com/AndreaGallo91)
- LinkedIn: [gallucci-andrea](https://www.linkedin.com/in/gallucci-andrea/)
- Email: andrea.gallucci1991@gmail.com

---

## 📄 Licenza

Questo progetto è open source e disponibile sotto la [MIT License](LICENSE).

---

<div align="center">
  <strong>Space{51}</strong> Portfolio 3D — Esplora i miei progetti sulla Luna! 🚀
</div>
