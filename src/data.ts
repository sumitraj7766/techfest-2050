import { ExhibitItem, TimelineEvent, GalaxyPlanet, TimelineMilestone, HoloCard } from './types';

export const EXHIBITSSET: ExhibitItem[] = [
  {
    id: 'ai-neural',
    title: 'Cognitive Synapse Engine',
    category: 'Artificial Intelligence',
    description: 'An interactive neural mesh simulating self-improving deep learning networks. Programmed with live feedback loops and synaptic routing weight visuals.',
    specs: ['98.4 TFLOPs simulation core', 'Dynamic neuron dendritic binding', 'Self-optimizing pathing nodes'],
    color: '#a855f7', // purple-500
    geometryType: 'icosahedron'
  },
  {
    id: 'quantum-core',
    title: 'Quantum Portal Resonance',
    category: 'Quantum Computing',
    description: 'A physical representation of qubit coherence state-spaces. Explore superposition and quantum entanglement ratios via topological phase distortion.',
    specs: ['64-Physical Qubit core array', 'Cryogenic cooling state visualizer', 'Zero-coherence decay simulation'],
    color: '#06b6d4', // cyan-500
    geometryType: 'torus'
  },
  {
    id: 'robotics-swarm',
    title: 'HexShield Drone Swarm',
    category: 'Robotics & Automation',
    description: 'Observe real-time spatial positioning, path-finding algorithms, and collaborative swarm mechanics under extreme kinetic obstacle scenarios.',
    specs: ['Kinematic vector routing', 'Swarm consensus sub-headers', 'Millisecond position correction'],
    color: '#10b981', // emerald-500
    geometryType: 'octahedron'
  },
  {
    id: 'space-matter',
    title: 'AeroDrive Plasma Thruster',
    category: 'Aerospace Engineering',
    description: 'A structural holographic visualization of next-generation electromagnetic drives, highlighting plasma ionization and magnetic acceleration vectors.',
    specs: ['4200s high specific impulse simulation', 'Superconducting magnetics matrix', 'Realcheck thermal gradient mapped'],
    color: '#f97316', // orange-500
    geometryType: 'sphere'
  }
];

export const SCHEDULEET: TimelineEvent[] = [
  {
    id: 'ev-1',
    time: '09:00 AM - 10:30 AM',
    title: 'Quantum Genesis Keynote',
    subtitle: 'The Age of Infinite Compute, by Dr. Evelyn Sterling',
    type: 'keynote',
    speaker: 'Dr. Evelyn Sterling (Director, Sterling Quantum Systems)',
    slotsLeft: 12,
  },
  {
    id: 'ev-2',
    time: '11:00 AM - 04:00 PM',
    title: 'ByteShift Hacker Showdown',
    subtitle: '24-hour rapid prototyping hackathon across twin dimensions',
    type: 'hackathon',
    prize: '$15,000 + Quantum Cloud Credits',
    slotsLeft: 45
  },
  {
    id: 'ev-3',
    time: '02:00 PM - 03:30 PM',
    title: 'Neural Synthesizer Workshop',
    subtitle: 'Build your first self-assembling WebGL canvas logic',
    type: 'workshop',
    speaker: 'Aiden Vance (Creative Engineer, NexaLabs)',
    slotsLeft: 0
  },
  {
    id: 'ev-4',
    time: '04:00 PM - 06:00 PM',
    title: 'Robotics Arena Arena Match',
    subtitle: 'Dynamic swarm autonomous navigating obstacle races',
    type: 'exhibition',
    slotsLeft: 80
  }
];

// 3D Technology Galaxy Planets (AI, Robotics, Space Tech, Quantum Computing, Cyber Security, IoT, Renewable Energy)
export const GALAXY_PLANETS: GalaxyPlanet[] = [
  {
    id: 'pla-ai',
    name: 'Neural Vertex Sphere',
    description: 'The epicenter of global cognitive intelligence. Synthesizing petabytes of self-tuning parameters in milliseconds.',
    summary: 'A glowing cluster of neural synaptic pathing nodes floating in mid-orbit.',
    marketStats: '99.4% Syntactic Coherence',
    color: '#c084fc', // purple-400
    accentColor: '#a855f7',
    position3D: [-2.4, 1.4, -0.6],
    size: 0.9,
    techSpecs: ['Self-optimizing node weights', 'Dynamic context clustering', 'Super-parallel tensor cores']
  },
  {
    id: 'pla-robotics',
    name: 'HexShield Hive Mind',
    description: 'Dynamic autonomous kinematics, combining physical actuator models with realcheck spatial telemetry.',
    summary: 'Spins as a double-nested geometric coordinate rings system.',
    marketStats: '0.4ms Kinematic Sync Delay',
    color: '#34d399', // emerald-400
    accentColor: '#10b981',
    position3D: [2.5, 1.2, 0.5],
    size: 0.8,
    techSpecs: ['Micro-actuator state vectoring', 'Consensus-based swarm routing', 'Lidar structural map mesh']
  },
  {
    id: 'pla-space',
    name: 'Voyager Relativistic Drive',
    description: 'Theoretical magnetohydrodynamic plasma thrusters designed to facilitate super-fast deep space missions.',
    summary: 'Superheated central sphere surrounded by dynamic plasma corona rings.',
    marketStats: '4,500s Specific Thrust Impulse',
    color: '#fb923c', // orange-400
    accentColor: '#f97316',
    position3D: [-2.2, -1.2, 0.4],
    size: 0.75,
    techSpecs: ['Superconducting coil alignment', 'Electromagnetic exhaust channeling', 'Cryogenic reactor feedback']
  },
  {
    id: 'pla-quantum',
    name: 'Superposition Gateway',
    description: 'A physical visual interface showing entanglement and coordinate qubit state transformations.',
    summary: 'Double-rotating ring with neon orbital particles representing qubits.',
    marketStats: '1.2M Coherent Gate Cycles',
    color: '#22d3ee', // cyan-405
    accentColor: '#06b6d4',
    position3D: [2.2, -1.4, -0.5],
    size: 0.85,
    techSpecs: ['Entanglement probability mapping', 'Zero-phase noise cancellation', 'Phase space boundary tracking']
  },
  {
    id: 'pla-security',
    name: 'Aegis Cryptographic Shield',
    description: 'Real-time state verification systems using advanced mathematical multi-party computation.',
    summary: 'A heavy geometric octahedron core wrapped with concentric secure layers.',
    marketStats: 'Zero Zero-Day Vulnerability Rate',
    color: '#f87171', // red-400
    accentColor: '#ef4444',
    position3D: [0.0, 2.2, -1.2],
    size: 0.72,
    techSpecs: ['Multi-party secret sharing', 'Quantum-resistant cryptograph', 'Polymorphic signature shield']
  },
  {
    id: 'pla-iot',
    name: 'Mesh Synchronicity Nexus',
    description: 'Billions of physical active nodes organized into a cohesive, self-healing communication matrix.',
    summary: 'A delicate web of glowing connections and pulsing traffic dots.',
    marketStats: '99.999% Seamless Edge Delivery',
    color: '#fbbf24', // amber-400
    accentColor: '#f59e0b',
    position3D: [-1.4, -2.4, -0.8],
    size: 0.65,
    techSpecs: ['Edge computing mesh pipeline', 'Holographic data forwarding', 'Predictive frequency tuning']
  },
  {
    id: 'pla-energy',
    name: 'Helios Fusion Chamber',
    description: 'Simulations of advanced magnetic-confinement reactors providing clean, high-efficiency energy grid systems.',
    summary: 'Superheated energetic plasma core with glowing convective current flares.',
    marketStats: 'Q-Factor Fusion Yield 14.8x',
    color: '#e879f9', // fuchsia-400
    accentColor: '#d946ef',
    position3D: [1.4, -2.4, 0.8],
    size: 0.78,
    techSpecs: ['Double-toroidal magnetic shell', 'High-speed plasma confinement', 'Thermodynamic heat-to-electricity grid']
  }
];

// Timeline of innovations (2026, 2030, 2040, 2050)
export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2026',
    title: 'Integrated Lattice Era',
    status: 'ACTIVE ERA',
    description: 'Techfest establishes the core interactive 3D WebGL portal. Decentralized systems and full-stack client-side telemetry arrays are initialized globally.',
    futureInsights: [
      'Universal biometric entry credentials introduced',
      'Real-time physical parameter mapping via browser shaders',
      '12-Axis signal monitors implemented for remote diagnostic streams'
    ],
    color: '#a855f7' // purple
  },
  {
    year: '2030',
    title: 'Autonomous AI Expansion',
    status: 'PREDICTED ERA',
    description: 'Cognitive neural synapse engines achieve self-improving parameter adaptation. Core model structures rewrite themselves dynamically on-chain without human prompting.',
    futureInsights: [
      'Self-assembling coordinate nodes generate user layouts automatically',
      'Natural-language cognitive models handle low-level structural code',
      'Unified model weights shared asynchronously through edge nodes'
    ],
    color: '#06b6d4' // cyan
  },
  {
    year: '2040',
    title: 'Human-AI Symbiosis',
    status: 'PREDICTED ERA',
    description: 'Direct bio-computational feedback loops connect human coordinate thought channels directly with relativistic quantum cloud arrays.',
    futureInsights: [
      'Entangled communication channels bypass lightspeed network delays',
      'Biometric keys integrated into local human cellular structures',
      'Holographic displays project deep-learning state maps in physical rooms'
    ],
    color: '#10b981' // green
  },
  {
    year: '2050',
    title: 'Future Planetary Civilization',
    status: 'PREDICTED ERA',
    description: 'Advanced magnetohydrodynamic plasma thrusters and quantum fusion grids facilitate interplanetary core exploration and absolute energetic independence.',
    futureInsights: [
      'Terraforming automated via planetary drone coordinate swarms',
      'Quantum teleportation of cryptographic keys over lightyears',
      'Infinite-compute centers established in lunar sub-surface cryogenic shells'
    ],
    color: '#f97316' // orange
  }
];

// Floating Holographic Events Cards
export const HOLO_CARDS: HoloCard[] = [
  {
    id: 'holo-robo',
    title: 'Robotics Gladiators Arena',
    category: 'Robotics Swarms',
    description: 'High-speed autonomous drones navigating severe sensory noise and kinetic dynamic interference in real-time.',
    date: 'Day 1: 14:00 UTC',
    venue: 'Sector G: Plasma Shell',
    relevance: 'Swarm Consensus 99.8%',
    glow: '#10b981'
  },
  {
    id: 'holo-ai',
    title: 'Adversarial AI Challenge',
    category: 'Neural Networks',
    description: 'Train local model weights in an arena environment battling self-assembled malicious parameters.',
    date: 'Day 2: 10:00 UTC',
    venue: 'Sector A: Cog Chamber',
    relevance: 'Model Loss < 0.001',
    glow: '#a855f7'
  },
  {
    id: 'holo-space',
    title: 'Astro-Holo Launch Pitch',
    category: 'Aerospace Engineering',
    description: 'Holographic simulation of plasma vector routing engine startups before remote virtual aerospace judges.',
    date: 'Day 2: 16:30 UTC',
    venue: 'Sector S: Launch Pad',
    relevance: 'Impulse 4200s Target',
    glow: '#f97316'
  },
  {
    id: 'holo-hack',
    title: 'Quantum Entangle Hackathon',
    category: 'Cyber Security & Crypto',
    description: 'A 24-hour rapid prototyping event using simulated cryogenic gate arrays for absolute security.',
    date: 'Day 3: 09:00 UTC',
    venue: 'Sector Q: Superposition',
    relevance: '$15K Prize Active',
    glow: '#06b6d4'
  },
  {
    id: 'holo-expo',
    title: 'Decentralized Tech Expo',
    category: 'Innovative Prototypes',
    description: 'Explore over 500 startups showing next-generation zero-point hardware prototypes and neural tools.',
    date: 'Ongoing Exhibit',
    venue: 'Sector X: Multiverse Grid',
    relevance: 'World Representatives',
    glow: '#ec4899'
  }
];

export const SYSTEM_LOGS = [
  'COGNITIVE_SYNAPSE_CORE: Routing synapses... OK',
  'QUANTUM_RESONATOR: Cryo-cooling maintaining 0.15K',
  'DRONE_MATRIX: Swarm consensus reached (100% active)',
  'AERODRIVE_IONIZER: Superconducting magnetic coils preheating',
  'NEXUS_MAIN_FRAME: Directing WebGL dimensional render loop...',
  'SECURITY_OVERLAY: Firewalls set to quantum-resistant lattice mode',
  'HELIO_REACTOR: Core density at steady fusion threshold',
  'AVATAR_COMMUNICATION_LINK: AVA AI Assistant online...'
];
