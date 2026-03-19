import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import Starting from '@pages/Starting'

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
      <main className='relative h-[300dvh]'>
        <Starting />
      </main>
    </>
  )
}

export default App