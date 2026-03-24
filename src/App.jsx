import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import Starting from '@components/Starting'
import BentoMatriz from '@components/BentoMatriz'

function App() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className='flex flex-col gap-8 relative overflow-x-clip'>
        <Starting />
        <main className='m-8'>
          <BentoMatriz />
        </main>
      </div>
    </>
  )
}

export default App