import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(0.1, 8, 6);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xc4b89a,
      transparent: true,
      opacity: 0.6
    });

    const spheres: THREE.Mesh[] = [];
    const positions: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < 15; i++) {
      const sphere = new THREE.Mesh(geometry, material.clone());
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      
      sphere.position.set(x, y, z);
      sphere.scale.setScalar(Math.random() * 0.5 + 0.5);
      
      scene.add(sphere);
      spheres.push(sphere);
      positions.push({ x, y, z, speed: Math.random() * 0.02 + 0.01 });
    }

    camera.position.z = 5;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      spheres.forEach((sphere, index) => {
        const pos = positions[index];
        sphere.position.y += Math.sin(Date.now() * pos.speed) * 0.01;
        sphere.position.x += Math.cos(Date.now() * pos.speed * 0.5) * 0.005;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingElements;
