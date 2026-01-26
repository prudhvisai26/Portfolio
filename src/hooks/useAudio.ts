import { Howl } from 'howler'
import { useRef, useEffect } from 'react'

function useAudio(soundUrl: string) {
    const soundRef = useRef<Howl | null>(null)
    
    useEffect(() => {
        // Create Howl instance after component mounts
        soundRef.current = new Howl({
            src: [soundUrl],
            volume: 0.5,
        })
        
        // Cleanup function - runs when component unmounts
        return () => {
            if (soundRef.current) {
                soundRef.current.unload()
            }
        }
    }, [soundUrl])
    
    const play = () => {
        if (soundRef.current) {
            soundRef.current.play()
        }
    }
    
    return { play }
}

export default useAudio