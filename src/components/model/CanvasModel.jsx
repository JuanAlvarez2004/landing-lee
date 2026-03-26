import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, useProgress } from "@react-three/drei";
import { forwardRef, useEffect, useRef } from "react";
import useMediaQuery from "@hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Componente interno que monitorea el progreso de carga
function SceneContent({ modelRef, onModelReady, isMobile }) {
  const { active } = useProgress()
  const didNotifyReadyRef = useRef(false)

  useEffect(() => {
    if (active || !modelRef?.current || didNotifyReadyRef.current) return

    if (onModelReady) {
      onModelReady(modelRef.current)
    }
    didNotifyReadyRef.current = true
  }, [active, modelRef, onModelReady])

  useGSAP(() => {
    if (active) return
    gsap.from('#canvas-container', {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "+=0.2")
  }, [active, modelRef])

  return (
    <>
      <Environment
        preset="night"
        background={false}
      />

      <group
        position={[0, isMobile ? 6 : 10, -80]}
        rotation={[0.5, Math.PI, 0]}
        scale={isMobile ? 0.5 : 0.7}
        ref={modelRef}
      >
        <Model />
      </group>
    </>
  )
}

const CanvasModel = forwardRef(({ onModelReady, containerRef }, ref) => {
  const isMobile = useMediaQuery()

  return (
    <div id="canvas-container" ref={containerRef} className='absolute inset-0 pointer-events-none' >
      <Canvas
        dpr={isMobile ? [0.5, 1.2] : [1, 2]}
        camera={{
          fov: 35,
        }}
        performance={{ min: 0.5 }}
        frameloop="always"
        gl={{
          alpha: true,
          stencil: false,
          depth: true,
        }}
      >
        <SceneContent isMobile={isMobile} modelRef={ref} onModelReady={onModelReady} />
      </Canvas>
    </div>
  )
})

CanvasModel.displayName = 'CanvasModel'

export default CanvasModel
