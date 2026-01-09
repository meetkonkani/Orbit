"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

function LiquidShape() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#4a90e2"      // Base color (Change to #000 for liquid chrome)
          attach="material"
          distort={0.5}        // How much it wobbles (0 to 1)
          speed={2}            // How fast it moves
          roughness={0.2}      // Shininess (0 = mirror, 1 = matte)
          metalness={0.8}      // Metallic look
        />
      </Sphere>
    </Float>
  );
}

export default function FluidSphere() {
  return (
    <div className="fixed inset-0 z-0 bg-[#e0e0e0]"> {/* Lighter background for contrast */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* LIGHTING IS CRITICAL FOR 3D LIQUIDS */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00aaff" />
        
        <LiquidShape />
      </Canvas>
    </div>
  );
}