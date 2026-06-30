import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed, distortion, mouseOffset }) {
  const ref = useRef();
  const startPos = useRef(position);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
    const mx = pointer.x * mouseOffset * 0.8;
    const my = -pointer.y * mouseOffset * 0.5;
    ref.current.position.x = startPos.current[0] + mx;
    ref.current.position.y = startPos.current[1] + my;
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

function ParticleLines({ positions, maxDist = 3 }) {
  const count = positions.length / 3;
  const pairs = useMemo(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          result.push(i, j);
        }
      }
    }
    return result;
  }, [positions, count, maxDist]);

  const lineCount = pairs.length / 2;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(lineCount * 2 * 3);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [lineCount]);

  const ref = useRef();
  useFrame(() => {
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < pairs.length; i += 2) {
      const a = pairs[i] * 3;
      const b = pairs[i + 1] * 3;
      const idx = i * 1.5;
      pos[idx] = positions[a];
      pos[idx + 1] = positions[a + 1];
      pos[idx + 2] = positions[a + 2];
      pos[idx + 3] = positions[b];
      pos[idx + 4] = positions[b + 1];
      pos[idx + 5] = positions[b + 2];
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
    </lineSegments>
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
  useFrame(({ clock, pointer }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = pointer.y * 0.05;
  });

  return (
    <group ref={ref}>
      <points>
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
      <ParticleLines positions={positions} maxDist={3.5} />
    </group>
  );
}

function CameraRig() {
  const { pointer } = useThree();
  useFrame(({ camera }) => {
    camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (-pointer.y * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />
      <CameraRig />
      <FloatingShape
        position={[-3, 1.5, -2]}
        color="#8b5cf6"
        speed={1.2}
        distortion={0.4}
        mouseOffset={2}
      />
      <FloatingShape
        position={[3, -1.5, -3]}
        color="#06b6d4"
        speed={0.8}
        distortion={0.6}
        mouseOffset={1.5}
      />
      <FloatingShape
        position={[1.5, 2.5, -4]}
        color="#a78bfa"
        speed={1.5}
        distortion={0.3}
        mouseOffset={2.5}
      />
      <Particles />
    </Canvas>
  );
}
