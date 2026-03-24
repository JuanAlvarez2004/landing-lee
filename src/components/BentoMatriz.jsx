import { useEffect, useRef, useState } from 'react'
import fullBody from '@assets/full-body-lee-color.png'
import konoha from '@assets/konoha-symbol.svg'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function BentoMatriz() {
  const [activeClone, setActiveClone] = useState(null)
  const gridRef = useRef(null)
  const cardRefs = useRef([])
  const cloneRefs = useRef([])
  const isAnimatingRef = useRef(false)

  const setCardRef = (index) => (element) => {
    cardRefs.current[index] = element
  }

  const setCloneRef = (index) => (element) => {
    cloneRefs.current[index] = element
  }

  const getBounds = (index) => {
    if (!gridRef.current) return null

    const source = cardRefs.current[index]
    const clone = cloneRefs.current[index]

    if (!source || !clone) return null

    const sourceRect = source.getBoundingClientRect()
    const containerRect = gridRef.current.getBoundingClientRect()

    return {
      clone,
      x: sourceRect.left - containerRect.left,
      y: sourceRect.top - containerRect.top,
      scaleX: sourceRect.width / containerRect.width,
      scaleY: sourceRect.height / containerRect.height,
    }
  }

  const openClone = (index) => {
    if (isAnimatingRef.current || activeClone !== null) return

    const bounds = getBounds(index)
    if (!bounds) return

    const { clone, x, y, scaleX, scaleY } = bounds
    isAnimatingRef.current = true

    setActiveClone(index)

    gsap.killTweensOf(clone)
    gsap.set(clone, {
      autoAlpha: 1,
      x,
      y,
      scaleX,
      scaleY,
      transformOrigin: 'top left',
      pointerEvents: 'auto',
    })

    gsap.to(clone, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.58,
      ease: 'power3.out',
      onComplete: () => {
        isAnimatingRef.current = false
      },
    })
  }

  const closeClone = (index) => {
    if (isAnimatingRef.current || activeClone === null) return

    const bounds = getBounds(index)
    if (!bounds) return

    const { clone, x, y, scaleX, scaleY } = bounds
    isAnimatingRef.current = true

    gsap.killTweensOf(clone)
    const closeTl = gsap.timeline({
      onComplete: () => {
        gsap.set(clone, { autoAlpha: 0, pointerEvents: 'none' })
        setActiveClone(null)
        isAnimatingRef.current = false
      },
    })

    closeTl
      .to(clone, {
        x,
        y,
        scaleX,
        scaleY,
        duration: 0.38,
        ease: 'power3.inOut',
      })
      .to(clone, {
        autoAlpha: 0,
        duration: 0.1,
        ease: 'none',
      }, "-=0.1")
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && activeClone !== null) {
        closeClone(activeClone)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeClone])

  useGSAP(() => {
    cloneRefs.current.forEach((clone) => {
      if (!clone) return
      gsap.set(clone, {
        autoAlpha: 0,
        pointerEvents: 'none',
        transformOrigin: 'top left',
      })
    })
  }, [])

  const renderCardContent = (index) => {
    if (index === 0) {
      return (
        <>
          <div className="bg-own-skin h-full"></div>
          <div className="bg-own-green h-full"></div>
          <div className="bg-own-pink h-full"></div>
        </>
      )
    }

    if (index === 1) return <div>2</div>
    if (index === 2) return <div>3</div>
    if (index === 3) return <div>4</div>

    if (index === 4) {
      return (
        <>
          <h2 className="text-6xl md:text-7xl lg:text-9xl font-picnic text-own-white">Rock Lee</h2>
          <div className="absolute inset-0 rounded-xl pointer-events-none [clip-path:inset(-50%_0_0_0)]">
            <img className="h-full w-full object-contain scale-150 pointer-events-none lg:scale-180" src={fullBody} alt="" />
          </div>
        </>
      )
    }

    if (index === 5) return <div>Lorem ipsum</div>
    if (index === 6) return <div>7</div>

    if (index === 7) {
      return <img className="object-cover" src={konoha} alt="Konoha Symbol" />
    }

    return <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  }

  return (
    <section ref={gridRef} className="relative grid grid-cols-1 gap-4 text-own-white md:grid-cols-4 md:grid-rows-4">
      <div
        ref={setCardRef(0)}
        onClick={() => openClone(0)}
        className="rounded-xl flex min-h-40 flex-col overflow-clip cursor-pointer md:row-span-2"
      >
        {renderCardContent(0)}
      </div>
      <div
        ref={setCardRef(1)}
        onClick={() => openClone(1)}
        className="bg-black rounded-xl p-5 grid place-content-center cursor-pointer"
      >
        {renderCardContent(1)}
      </div>
      <div
        ref={setCardRef(2)}
        onClick={() => openClone(2)}
        className="bg-black rounded-xl p-5 grid place-content-center cursor-pointer"
      >
        {renderCardContent(2)}
      </div>
      <div
        ref={setCardRef(3)}
        onClick={() => openClone(3)}
        className="bg-black rounded-xl p-5 grid place-content-center cursor-pointer md:row-span-2"
      >
        {renderCardContent(3)}
      </div>
      <div
        ref={setCardRef(4)}
        onClick={() => openClone(4)}
        className="relative rounded-xl bg-black grid place-content-center min-h-65 cursor-pointer md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-2"
      >
        {renderCardContent(4)}
      </div>
      <div
        ref={setCardRef(5)}
        onClick={() => openClone(5)}
        className="bg-black rounded-xl p-5 text-2xl cursor-pointer md:row-span-2 md:row-start-3 md:[writing-mode:vertical-lr] md:rotate-180 md:text-3xl"
      >
        {renderCardContent(5)}
      </div>
      <div
        ref={setCardRef(6)}
        onClick={() => openClone(6)}
        className="bg-black rounded-xl p-5 grid place-content-center cursor-pointer md:col-start-2 md:row-start-4"
      >
        {renderCardContent(6)}
      </div>
      <div
        ref={setCardRef(7)}
        onClick={() => openClone(7)}
        className="rounded-xl p-5 bg-black flex items-center justify-center cursor-pointer md:col-start-4 md:row-start-3"
      >
        {renderCardContent(7)}
      </div>
      <div
        ref={setCardRef(8)}
        onClick={() => openClone(8)}
        className="bg-black rounded-xl p-5 flex items-center justify-center cursor-pointer md:col-span-2 md:col-start-3 md:row-start-4"
      >
        {renderCardContent(8)}
      </div>

      {Array.from({ length: 9 }).map((_, index) => {
        const isCenterCard = index === 4
        const isVerticalCard = index === 5
        const isStripeCard = index === 0

        return (
          <div
            key={`clone-${index}`}
            ref={setCloneRef(index)}
            onClick={() => closeClone(index)}
            aria-hidden={activeClone !== index}
            className="absolute inset-0 z-50 rounded-xl pointer-events-none"
          >
            <div
              className={[
                'h-full w-full rounded-xl',
                isStripeCard ? 'flex flex-col overflow-clip' : 'bg-black p-5',
                isCenterCard ? 'relative grid place-content-center min-h-65' : '',
                isVerticalCard ? 'text-2xl md:text-3xl md:[writing-mode:vertical-lr] md:rotate-180' : '',
                index === 1 || index === 2 || index === 3 || index === 6 ? 'grid place-content-center' : '',
                index === 7 || index === 8 ? 'flex items-center justify-center' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {renderCardContent(index)}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default BentoMatriz