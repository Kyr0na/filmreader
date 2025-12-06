'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

// Модель с автоматическим вращением
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef()
  
  // Автоматическое вращение каждый кадр
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5 // 0.5 радиан в секунду
    }
  })
  
  return <primitive ref={modelRef} object={scene} scale={1} rotation={[Math.PI, 0, 70]} />
}

// Альтернативный вариант с более контролируемым вращением
function RotatingModel({ modelPath, rotationSpeed = 0.5 }) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef()
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Плавное вращение
      modelRef.current.rotation.y += delta * rotationSpeed
    }
  })
  
  return <primitive ref={modelRef} object={scene} scale={1} />
}

export default function Simple3DModel() {
  return (
    <div className='w-full h-96 flex flex-wrap justify-center gap-8 mt-0'>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />
        
        
        
        <Suspense fallback={null}>
          <Model modelPath="/models/cubic.glb" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}           // Включить зум колесиком
          enablePan={true}           // Включить перемещение
          enableRotate={true}        // Включить вращение
          zoomSpeed={0.8}            // Скорость зума
          rotateSpeed={0.8}          // Скорость вращения мышью
          minDistance={2}            // Минимальное расстояние камеры
          maxDistance={20}           // Максимальное расстояние камеры
        />
      </Canvas>
    </div>
  )
}