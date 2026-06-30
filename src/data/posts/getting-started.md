---
title: "Getting Started with React & Three.js"
date: "2026-06-28"
description: "A beginner-friendly guide to combining React with Three.js for stunning 3D web experiences."
---

## Why React + Three.js?

Three.js is the most popular WebGL library, and React Three Fiber brings its power into the React ecosystem with a declarative API.

### Setting Up

First, install the dependencies:

```bash
npm install three @react-three/fiber @react-three/drei
```

### Your First Scene

Here's the simplest 3D scene you can create:

```jsx
import { Canvas } from '@react-three/fiber'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <Box />
    </Canvas>
  )
}
```

### Key Concepts

- **Canvas** — The root component that creates the WebGL context
- **Meshes** — 3D objects composed of geometry + material
- **Lights** — Required to illuminate your scene

This is just the beginning — experiment with different geometries, materials, and animations to create something unique!
