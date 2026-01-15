'use client'

import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Generate positions OUTSIDE component
const count = 1000

const generatePositions = () => {
    const pos = new Float32Array(count * 3)
    
    for(let i = 0; i < count; i++){
        pos[i * 3 + 0] = (Math.random() - 0.5) * 30  // x: wider spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * 30  // y: taller spread
        pos[i * 3 + 2] = (Math.random() - 0.5) * 15-5  // z: push back from camera
    }
    
    return pos
}

// Generate random speeds for variety
const generateSpeeds = () => {
    const speeds = new Float32Array(count)
    for(let i = 0; i < count; i++){
        speeds[i] = 0.005 + Math.random() * 0.02  // Random speed between 0.005 and 0.025
    }
    return speeds
}

const particlePositions = generatePositions()
const particleSpeeds = generateSpeeds()

const Particles = () => {
    const pointsRef = useRef<THREE.Points>(null)

    useFrame(() => {
        if(!pointsRef.current) return

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
        
        for(let i = 0; i < count; i++){
            // Move up with individual speed
            positions[i * 3 + 1] += particleSpeeds[i]
            positions[i * 3 + 0] += Math.sin(Date.now() * 0.001 + i) * 0.002
            
            // Reset to bottom when reaching top
            if(positions[i * 3 + 1] > 15){
                positions[i * 3 + 1] = -15
                // Randomize X position when resetting for more natural look
                positions[i * 3 + 0] = (Math.random() - 0.5) * 30
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
                size={0.02}
                color="#ffffff"
                transparent
                opacity={0.7}
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
                <Particles />
            </Canvas>
        </div>
    )
}

export default ParticleBackground;