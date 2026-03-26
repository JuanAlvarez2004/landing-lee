import CanvasModel from '@components/model/CanvasModel'
import { useRef, useCallback } from 'react'

function Lotus() {
  const modelRef = useRef(null)
  const canvasContainerRef = useRef(null)

  // Callback optimizado que se ejecuta cuando el modelo está listo
  const handleModelReady = useCallback((modelGroup) => {
    if (modelGroup && !modelRef.current) {
      modelRef.current = modelGroup
    }
  }, [])


  return (
    <section className="relative h-[90dvh]  mb-8">
      <div className='flex flex-col font-picnic text-end text-9xl md:text-[12rem] lg:text-[17rem] pointer-events-none select-none leading-[0.8]'>
        <span className='absolute left-1/2 top-0 transform -translate-x-1/2 md:translate-x-0 md:left-0'>Front</span>
        <span className='absolute right-1/2 bottom-0 transform translate-x-1/2 md:translate-x-0 md:right-0'>Lotus</span>
      </div>
      {/* Canvas con modelo 3D */}
      <CanvasModel ref={modelRef} containerRef={canvasContainerRef} onModelReady={handleModelReady} />
    </section>
  )
}

export default Lotus