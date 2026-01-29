'use client'

import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Configuration
const count = 900

// Generate positions - spread across ENTIRE screen
const generatePositions = () => {
    const pos = new Float32Array(count * 3)
    for(let i = 0; i < count; i++){
        pos[i * 3 + 0] = (Math.random() - 0.5) * 60   // X: full width
        pos[i * 3 + 1] = (Math.random() - 0.5) * 60   // Y: full height
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
}

// Generate speeds - varied for natural look
const generateSpeeds = () => {
    const speeds = new Float32Array(count)
    for(let i = 0; i < count; i++){
        speeds[i] = 0.05 + Math.random() * 0.1   // Fast diagonal fall
    }
    return speeds
}

const particlePositions = generatePositions()
const particleSpeeds = generateSpeeds()

const DiagonalParticles = () => {
    const pointsRef = useRef<THREE.Points>(null)

    useFrame(() => {
        if(!pointsRef.current) return

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
        
        for(let i = 0; i < count; i++){
            // Move DIAGONALLY: down and left
            positions[i * 3 + 0] -= particleSpeeds[i] * 0.6   // X: move left
            positions[i * 3 + 1] -= particleSpeeds[i]          // Y: move down
            
            // Reset when off screen (bottom OR left)
            if(positions[i * 3 + 1] < -30 || positions[i * 3 + 0] < -30){
                // Reset to top-right area (random spread)
                positions[i * 3 + 0] = (Math.random() * 40) + 10   // X: right side
                positions[i * 3 + 1] = (Math.random() * 20) + 20   // Y: top
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
            }
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlePositions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#ffffff"
                transparent
                opacity={0.85}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

function ParticleBackground(){
    return(
        <div className="absolute inset-0 z-0 w-full h-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <DiagonalParticles />
            </Canvas>
        </div>
    )
}

export default ParticleBackground
