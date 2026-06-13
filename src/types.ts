export interface ExhibitItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
  color: string;
  geometryType: 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'hackathon' | 'keynote' | 'workshop' | 'exhibition';
  prize?: string;
  speaker?: string;
  slotsLeft: number;
}

export interface SimulatorConfig {
  speed: number;
  particleSize: number;
  explodeForce: number;
  gridOpacity: number;
  colorTheme: 'cyber' | 'emerald' | 'quantum' | 'flare' | 'space';
  noiseLevel: number;
}

export interface GalaxyPlanet {
  id: string;
  name: string;
  description: string;
  summary: string;
  marketStats: string;
  color: string;
  accentColor: string;
  position3D: [number, number, number];
  size: number;
  techSpecs: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  status: string;
  description: string;
  futureInsights: string[];
  color: string;
}

export interface HoloCard {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  venue: string;
  relevance: string;
  glow: string;
}
