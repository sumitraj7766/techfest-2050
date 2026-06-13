import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SimulatorConfig, GalaxyPlanet } from '../types';
import { GALAXY_PLANETS } from '../data';

interface ThreeCanvasProps {
  activeSection: number;
  scrollProgress: number; // 0 to 1 value for continuous transitions
  activeExhibitId: string;
  config: SimulatorConfig;
  triggerExplosion: boolean;
  onExplosionComplete: () => void;
  selectedPlanetId: string | null;
  onPlanetSelect: (planetId: string) => void;
  hoveredPlanetId: string | null;
  onPlanetHover: (planetId: string | null) => void;
}

// Helper to create a soft-glowing rounded circle texture dynamically without external assets!
function createGlowSprite() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(200, 230, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(canvas);
}

export default function ThreeCanvas({
  activeSection,
  scrollProgress,
  activeExhibitId,
  config,
  triggerExplosion,
  onExplosionComplete,
  selectedPlanetId,
  onPlanetSelect,
  hoveredPlanetId,
  onPlanetHover
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // High-performance particle configuration
  const particleCount = 1400;
  const particlesGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const pointsMeshRef = useRef<THREE.Points | null>(null);
  
  // Center Energy Core meshes
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const concentricRing1Ref = useRef<THREE.Mesh | null>(null);
  const concentricRing2Ref = useRef<THREE.Mesh | null>(null);

  // Planet meshes ref (mapped to planet ids)
  const planetMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const planetOrbitsRef = useRef<THREE.Line[]>([]);
  
  // Track dynamic coordinates
  const positionsBaseRef = useRef<Float32Array | null>(null); // Original mathematical node structure
  const positionsCurrentRef = useRef<Float32Array | null>(null); // Mapped points rendered currently
  const positionsTargetRef = useRef<Float32Array | null>(null); // Destination shape map
  const velocitiesRef = useRef<Float32Array | null>(null); // Acceleration vectors for click explosions
  const explosionProgressRef = useRef<number>(0);
  
  // Mouse coordinates mapped to 3D space
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster | null>(null);

  // Handle color conversions for theme variations
  const getThemeColors = (theme: typeof config.colorTheme) => {
    switch (theme) {
      case 'space':
        return { primary: 0xf472b6, secondary: 0xdb2777, accent: 0xfb7185 };
      case 'emerald':
        return { primary: 0x10b981, secondary: 0x059669, accent: 0x34d399 };
      case 'quantum':
        return { primary: 0x06b6d4, secondary: 0x3b82f6, accent: 0xa855f7 };
      case 'flare':
        return { primary: 0xf97316, secondary: 0xef4444, accent: 0xfacc15 };
      case 'cyber':
      default:
        return { primary: 0xa855f7, secondary: 0xec4899, accent: 0x3b82f6 };
    }
  };

  // Pre-calculate structural targets
  const getTargetPositions = (section: number, progress: number, exhibitId: string): Float32Array => {
    const arr = new Float32Array(particleCount * 3);
    
    // SECTION 0: HERO PORTAL CORE - Double Concentric glowing Portal Ring
    if (section === 0) {
      for (let i = 0; i < particleCount; i++) {
        // Outer ring
        if (i < particleCount * 0.6) {
          const u = (i / (particleCount * 0.6)) * Math.PI * 2;
          const r = 2.0 + Math.sin(u * 12) * 0.08;
          arr[i * 3] = r * Math.cos(u);
          arr[i * 3 + 1] = r * Math.sin(u);
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        } else {
          // Internal swirling vortex funnel
          const u = (i / particleCount) * Math.PI * 2 * 20;
          const step = (i - particleCount * 0.6) / (particleCount * 0.4);
          const r = (1.5 * (1.0 - step)) + 0.1;
          arr[i * 3] = r * Math.cos(u);
          arr[i * 3 + 1] = r * Math.sin(u);
          arr[i * 3 + 2] = -step * 2.5 + Math.sin(u * 2) * 0.1;
        }
      }
    }
    // SECTION 1: 3D TECHNOLOGY GALAXY - Orbits clustering points near planets
    else if (section === 1) {
      const planetKeys = GALAXY_PLANETS;
      for (let i = 0; i < particleCount; i++) {
        // Orbit rings logic or dust clusters or standard shapes based on selected exhibit active state
        const targetPlanet = planetKeys[i % planetKeys.length];
        const [px, py, pz] = targetPlanet.position3D;
        
        // Arrange points in standard dust clouds orbiting target planet coordinates
        const theta = Math.random() * Math.PI * 2;
        const radius = targetPlanet.size + 0.2 + Math.random() * 0.4;
        
        arr[i * 3] = px + radius * Math.cos(theta);
        arr[i * 3 + 1] = py + radius * Math.sin(theta) * 0.5;
        arr[i * 3 + 2] = pz + radius * Math.sin(theta) * 0.8;
      }
    }
    // SECTION 2: SIMULATOR REACTOR CORE / WAVE STRUCTURE
    else if (section === 2) {
      const cols = 45;
      const rows = 31;
      const spacingX = 0.25;
      const spacingZ = 0.25;
      const width = cols * spacingX;
      const depth = rows * spacingZ;
      
      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols) % rows;
        const x = col * spacingX - width / 2;
        const z = row * spacingZ - depth / 2;
        
        // Kinetic Reactor Ripple noise
        const distFromCenter = Math.sqrt(x * x + z * z);
        const y = Math.sin(distFromCenter * 2.2) * 0.45;

        arr[i * 3] = x;
        arr[i * 3 + 1] = y - 0.4; // push offset downwards
        arr[i * 3 + 2] = z;
      }
    }
    // SECTION 3: REGISTER DESK / TIMELINE DOUBLE HELIX
    else if (section === 3) {
      for (let i = 0; i < particleCount; i++) {
        const isStrandA = i % 2 === 0;
        const angle = (i / 22) * Math.PI;
        const radius = 1.6;
        const height = 5.0;
        const y = ((i / particleCount) * height) - (height / 2);
        
        const phaseShift = isStrandA ? 0 : Math.PI;
        arr[i * 3] = radius * Math.cos(angle + phaseShift);
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = radius * Math.sin(angle + phaseShift);
      }
    }
    return arr;
  };

  // Initialize scene, camera, renderer, planets & core elements
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020205, 0.05);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // RAYCASTER FOR INTERACTIVE CLICKING
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;

    // PARTICLES GEOMETRY INIT OR CACHE
    const geometry = new THREE.BufferGeometry();
    particlesGeometryRef.current = geometry;

    const initialPositions = getTargetPositions(0, 0, '');
    positionsCurrentRef.current = new Float32Array(initialPositions);
    positionsTargetRef.current = new Float32Array(initialPositions);
    positionsBaseRef.current = new Float32Array(initialPositions);

    const velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) velocities[i] = 0;
    velocitiesRef.current = velocities;

    geometry.setAttribute('position', new THREE.BufferAttribute(positionsCurrentRef.current, 3));

    const themeColors = getThemeColors(config.colorTheme);
    const pointMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(themeColors.primary),
      size: config.particleSize,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createGlowSprite()
    });

    const points = new THREE.Points(geometry, pointMaterial);
    pointsMeshRef.current = points;
    scene.add(points);

    // CENTRAL REACTOR COMPONENT & NEON TORUS RINGS (CORES)
    const coreGeometry = new THREE.IcosahedronGeometry(1.0, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: themeColors.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const mainCore = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMeshRef.current = mainCore;
    scene.add(mainCore);

    // Outermost Concentric HUD neon ring 1
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.04, 3, 32);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: themeColors.accent,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    const concentric1 = new THREE.Mesh(ring1Geo, ring1Mat);
    concentric1.rotation.x = Math.PI / 2.5;
    concentricRing1Ref.current = concentric1;
    scene.add(concentric1);

    // Outer HUD neon ring 2
    const ring2Geo = new THREE.TorusGeometry(1.6, 0.02, 4, 24);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: themeColors.secondary,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    const concentric2 = new THREE.Mesh(ring2Geo, ring2Mat);
    concentric2.rotation.x = -Math.PI / 3;
    concentricRing2Ref.current = concentric2;
    scene.add(concentric2);

    // 3D PLANETS (GALAXY TECHNOLOGY SECTOR)
    const meshesMap = planetMeshesRef.current;
    GALAXY_PLANETS.forEach(planet => {
      // Create a group to bundle planet sphere and detail ring
      const planetGroup = new THREE.Group();
      planetGroup.position.set(...planet.position3D);

      const sphereGeo = new THREE.SphereGeometry(planet.size * 0.5, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: planet.color,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { id: planet.id, type: 'planet' };
      planetGroup.add(sphereMesh);

      // Accent orbit ring hugging planet core
      const hugRingGeo = new THREE.TorusGeometry(planet.size * 0.7, 0.015, 3, 24);
      const hugRingMat = new THREE.MeshBasicMaterial({
        color: planet.accentColor,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
        blending: THREE.AdditiveBlending
      });
      const hugRing = new THREE.Mesh(hugRingGeo, hugRingMat);
      hugRing.rotation.x = Math.PI / 3;
      planetGroup.add(hugRing);

      // Save references
      meshesMap.set(planet.id, sphereMesh);
      scene.add(planetGroup);

      // Create beautiful faint golden/cyber orbital lines flowing back to center Reactor core
      const pointsArray = [];
      const steps = 60;
      const radiusToCore = Math.sqrt(planet.position3D[0] ** 2 + planet.position3D[1] ** 2 + planet.position3D[2] ** 2);
      for (let s = 0; s <= steps; s++) {
        // Build smooth curved path to center orbit
        const theta = (s / steps) * Math.PI * 2;
        const radius = radiusToCore;
        const angleOffset = Math.atan2(planet.position3D[1], planet.position3D[0]);
        pointsArray.push(new THREE.Vector3(
          radius * Math.cos(theta + angleOffset),
          radius * Math.sin(theta + angleOffset) * 0.4,
          planet.position3D[2] * Math.sin(theta)
        ));
      }

      const pathsGeo = new THREE.BufferGeometry().setFromPoints(pointsArray);
      const pathsMat = new THREE.LineBasicMaterial({
        color: planet.color,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
      });
      const orbitLine = new THREE.Line(pathsGeo, pathsMat);
      scene.add(orbitLine);
      planetOrbitsRef.current.push(orbitLine);
    });

    // MOUSE DYNAMIC CORRESPONDENCE
    const getCloserObject = (clientX: number, clientY: number) => {
      if (!camera || !raycaster || !containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const childSpheres = Array.from(meshesMap.values()) as THREE.Object3D[];
      const intersects = raycaster.intersectObjects(childSpheres);
      if (intersects.length > 0) {
        return intersects[0].object.userData.id as string;
      }
      return null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetMouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle hover checks at 200ms checkpoints for performance
      const planetId = getCloserObject(event.clientX, event.clientY);
      onPlanetHover(planetId);
    };

    const handleMouseClick = (event: MouseEvent) => {
      const planetId = getCloserObject(event.clientX, event.clientY);
      if (planetId) {
        onPlanetSelect(planetId);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // RESIZE EVENT
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('resize', handleResize);
      
      renderer.dispose();
      geometry.dispose();
      coreGeometry.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      
      pointMaterial.dispose();
      coreMaterial.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();

      meshesMap.clear();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Morph targets when section shifts
  useEffect(() => {
    const nextTargets = getTargetPositions(activeSection, scrollProgress, activeExhibitId);
    positionsTargetRef.current = nextTargets;

    // Adjust visibility of the central core and planet structures
    if (coreMeshRef.current && concentricRing1Ref.current && concentricRing2Ref.current) {
      const showCenterCore = (activeSection === 0 || activeSection === 2);
      coreMeshRef.current.visible = showCenterCore;
      concentricRing1Ref.current.visible = showCenterCore;
      concentricRing2Ref.current.visible = showCenterCore;

      if (activeSection === 2) {
        coreMeshRef.current.scale.set(1.4, 1.4, 1.4);
        concentricRing1Ref.current.scale.set(1.2, 1.2, 1.2);
      } else {
        coreMeshRef.current.scale.set(1.0, 1.0, 1.0);
        concentricRing1Ref.current.scale.set(1.0, 1.0, 1.0);
      }
    }

    // Toggle planet visibility based on galaxy focus sector (Section 1)
    const meshesMap = planetMeshesRef.current;
    meshesMap.forEach((mesh, id) => {
      if (mesh.parent) {
        mesh.parent.visible = (activeSection === 1);
      }
    });

    planetOrbitsRef.current.forEach(orbit => {
      orbit.visible = (activeSection === 1);
    });
  }, [activeSection, activeExhibitId, scrollProgress]);

  // Handle color updates at runtime
  useEffect(() => {
    if (pointsMeshRef.current && coreMeshRef.current && concentricRing1Ref.current) {
      const themeColors = getThemeColors(config.colorTheme);
      
      if (!Array.isArray(pointsMeshRef.current.material)) {
        (pointsMeshRef.current.material as THREE.PointsMaterial).color.setHex(themeColors.primary);
        (pointsMeshRef.current.material as THREE.PointsMaterial).size = config.particleSize;
      }

      if (!Array.isArray(coreMeshRef.current.material)) {
        (coreMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(themeColors.secondary);
      }

      if (!Array.isArray(concentricRing1Ref.current.material)) {
        (concentricRing1Ref.current.material as THREE.MeshBasicMaterial).color.setHex(themeColors.accent);
      }
    }
  }, [config.colorTheme, config.particleSize]);

  // Click Explosion Burst Trigger
  useEffect(() => {
    if (triggerExplosion && velocitiesRef.current && positionsBaseRef.current) {
      explosionProgressRef.current = 1.0;
      
      const v = velocitiesRef.current;
      const force = config.explodeForce;
      
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        v[i * 3] = Math.sin(phi) * Math.cos(theta) * force * (1.2 + Math.random() * 0.8);
        v[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * force * (1.2 + Math.random() * 0.8);
        v[i * 3 + 2] = Math.cos(phi) * force * (1.2 + Math.random() * 0.8);
      }

      const timer = setTimeout(() => {
        onExplosionComplete();
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [triggerExplosion]);

  // MAIN REAL-TIME ANIMATION LOOP
  useEffect(() => {
    let animFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const scene = sceneRef.current;
      const points = pointsMeshRef.current;
      const core = coreMeshRef.current;
      const ring1 = concentricRing1Ref.current;
      const ring2 = concentricRing2Ref.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;

      if (!scene || !points || !camera || !renderer) return;

      // Smooth mouse coordinate filters
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      // Parallax particle stage tilt
      points.rotation.y = time * 0.08 * config.speed + mouseRef.current.x * 0.22;
      points.rotation.x = mouseRef.current.y * 0.15;

      // Spin central core and neon rings
      if (core && core.visible) {
        core.rotation.y = time * 0.4 * config.speed;
        core.rotation.z = Math.sin(time) * 0.15;
      }
      if (ring1 && ring1.visible) {
        ring1.rotation.z = -time * 0.25 * config.speed;
        ring1.rotation.y = time * 0.06 * config.speed + mouseRef.current.x * 0.3;
      }
      if (ring2 && ring2.visible) {
        ring2.rotation.z = time * 0.35 * config.speed;
        ring2.rotation.x = -time * 0.04 * config.speed + mouseRef.current.y * 0.2;
      }

      // Rotate and animate individual visual planet groups!
      const meshesMap = planetMeshesRef.current;
      meshesMap.forEach((mesh, id) => {
        if (mesh.parent && mesh.parent.visible) {
          // Slow orbit drift
          const orbitSpeed = 0.08 * config.speed;
          const orbitRadiusScale = 1.0;
          
          // Hover highlighting feedback (scaling planet up slightly)
          const targetScale = hoveredPlanetId === id || selectedPlanetId === id ? 1.35 : 1.0;
          mesh.scale.x += (targetScale - mesh.scale.x) * 0.12;
          mesh.scale.y += (targetScale - mesh.scale.y) * 0.12;
          mesh.scale.z += (targetScale - mesh.scale.z) * 0.12;

          // Orbit spin animation
          mesh.rotation.y = time * 0.4;
          mesh.parent.rotation.y = time * 0.02 * config.speed;
        }
      });

      // Smooth cinematic camera movement based on scroll sections and selected planet zoom focus
      let targetZ = 5.5;
      let targetX = 0;
      let targetY = 0;

      if (activeSection === 1) { // 3D GALAXY PLANETS
        if (selectedPlanetId) {
          const selectedPlanet = GALAXY_PLANETS.find(p => p.id === selectedPlanetId);
          if (selectedPlanet) {
            const [px, py, pz] = selectedPlanet.position3D;
            // Target the camera to look closer towards the selected planet!
            targetX = px * 0.72;
            targetY = py * 0.72;
            targetZ = 3.2; // Zoom core!
          }
        } else {
          targetZ = 5.2;
        }
      } else if (activeSection === 2) { // SIMULATOR REACTOR
        targetZ = 6.2;
        targetY = 0.6;
        camera.lookAt(0, -0.4, 0);
      } else if (activeSection === 3) { // TIMELINE
        targetZ = 4.8;
      }

      // Smooth camera interpolation
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;

      // MATHEMATICAL VERTEX COMPILING (SHAPE MORPHING ON SCROLL)
      const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
      const current = positionsCurrentRef.current;
      const target = positionsTargetRef.current;
      const velocities = velocitiesRef.current;

      if (current && target && posAttr && velocities) {
        const morphSpeed = 0.042;

        for (let i = 0; i < particleCount; i++) {
          const idxX = i * 3;
          const idxY = i * 3 + 1;
          const idxZ = i * 3 + 2;

          if (explosionProgressRef.current > 0) {
            velocities[idxX] *= 0.94;
            velocities[idxY] *= 0.94;
            velocities[idxZ] *= 0.94;

            current[idxX] += velocities[idxX];
            current[idxY] += velocities[idxY];
            current[idxZ] += velocities[idxZ];

            const hookeStrength = 0.015 * (1.0 - explosionProgressRef.current);
            current[idxX] += (target[idxX] - current[idxX]) * hookeStrength;
            current[idxY] += (target[idxY] - current[idxY]) * hookeStrength;
            current[idxZ] += (target[idxZ] - current[idxZ]) * hookeStrength;
          } else {
            let repelX = 0;
            let repelY = 0;
            let repelZ = 0;

            const pointPosition = new THREE.Vector3(current[idxX], current[idxY], current[idxZ]);
            pointPosition.applyMatrix4(points.matrixWorld);

            const simulatedMouse3D = new THREE.Vector3(
              mouseRef.current.x * 2.8,
              mouseRef.current.y * 2.2,
              0
            );

            const distToMouse = pointPosition.distanceTo(simulatedMouse3D);
            if (distToMouse < 0.8) {
              const direction = new THREE.Vector3().subVectors(pointPosition, simulatedMouse3D).normalize();
              const pushFactor = (0.8 - distToMouse) * 0.3;
              repelX = direction.x * pushFactor;
              repelY = direction.y * pushFactor;
              repelZ = direction.z * pushFactor;
            }

            current[idxX] += (target[idxX] - current[idxX]) * morphSpeed + repelX;
            current[idxY] += (target[idxY] - current[idxY]) * morphSpeed + repelY;
            current[idxZ] += (target[idxZ] - current[idxZ]) * morphSpeed + repelZ;

            // Sandbox specific config ripples noise
            if (activeSection === 2) {
              const noiseX = current[idxX];
              const noiseZ = current[idxZ];
              const noiseForce = Math.sin(time * 3.2 * config.speed + (noiseX * 1.8) + (noiseZ * 1.8)) * 0.08 * config.noiseLevel;
              current[idxY] += noiseForce;
            }
          }
        }

        if (explosionProgressRef.current > 0) {
          explosionProgressRef.current -= delta * 0.8;
          if (explosionProgressRef.current < 0) explosionProgressRef.current = 0;
        }

        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [activeSection, config, activeExhibitId, selectedPlanetId, hoveredPlanetId]);

  return (
    <div
      id="3d-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto select-none"
    />
  );
}
