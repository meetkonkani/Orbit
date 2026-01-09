"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OptimizedParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 800 : 2500;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5; 
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / (totalHeight || 1); // Avoid division by zero
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const scrollY = scrollRef.current;

    // 1. CONSTANT ROTATION
    // Standard rotation on Y, scroll-reactive on X
    pointsRef.current.rotation.y += delta * 0.15;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x, 
      scrollY * Math.PI, 
      0.1
    );

    // 2. STABLE ZOOM (Removed pulse/heartbeat)
    // The sphere only expands based on scroll position now
    const zoom = 0.6 + Math.abs(Math.sin(scrollY * Math.PI * 3)) * 0.4;
    pointsRef.current.scale.setScalar(zoom);

    // 3. DYNAMIC OPACITY
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = THREE.MathUtils.lerp(
      material.opacity, 
      0.2 + (scrollY * 0.3), // Slightly lowered peak opacity for cleaner look
      0.1
    );
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={isMobile ? 0.02 : 0.008}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleSphere() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full pointer-events-none bg-black">
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <OptimizedParticles />
      </Canvas>
    </div>
  );
}