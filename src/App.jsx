import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'

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
    <main className='h-[300dvh]'>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <h1 className='font-picnic text-9xl'>hola</h1>
    </main>
  )
}

export default App