
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Cylinder, Stars, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }) => {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.2;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.5}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
       ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.5} transparent opacity={0.6} wireframe />
    </Torus>
  );
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#4F46E5" scale={1.2} />
          <MacroscopicWave />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <QuantumParticle position={[-3, 1, -2]} color="#9333EA" scale={0.5} />
           <QuantumParticle position={[3, -1, -3]} color="#C5A059" scale={0.6} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export const EngineeringAbstractScene = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
          <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            {/* Core Box */}
            <Box args={[1.5, 1.5, 1.5]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} wireframe />
            </Box>
            
            {/* Floating connecting spheres */}
            <Sphere args={[0.2, 16, 16]} position={[1.5, 0, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} />
            </Sphere>
            <Sphere args={[0.2, 16, 16]} position={[-1.5, 0, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} />
            </Sphere>
             <Sphere args={[0.2, 16, 16]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} />
            </Sphere>
             <Sphere args={[0.2, 16, 16]} position={[0, -1.5, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} />
            </Sphere>

            {/* Connecting Cylinders */}
            <Cylinder args={[0.05, 0.05, 3]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#444" metalness={0.5} />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 3]}>
                <meshStandardMaterial color="#444" metalness={0.5} />
            </Cylinder>

            {/* Inner Geometry */}
            <Icosahedron args={[0.8]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </Icosahedron>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
