import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function FloatingShape({ position, color, speed, distortion }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={distortion}
          speed={speed}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />
      <FloatingShape
        position={[-3, 1.5, -2]}
        color="#8b5cf6"
        speed={1.2}
        distortion={0.4}
      />
      <FloatingShape
        position={[3, -1.5, -3]}
        color="#06b6d4"
        speed={0.8}
        distortion={0.6}
      />
      <FloatingShape
        position={[1.5, 2.5, -4]}
        color="#a78bfa"
        speed={1.5}
        distortion={0.3}
      />
      <Particles />
    </Canvas>
  );
}
