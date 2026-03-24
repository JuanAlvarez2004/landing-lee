import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import faceLee from '@assets/outline-lee.png'

function Starting() {
  useGSAP(() => {
    const firstTitle = document.querySelector("#first-title")
    const secondTitle = document.querySelector("#second-title")
    const boxTitle = document.querySelector("#box-title")
    const boxImage = document.querySelector("#box-title img")
    const tl = gsap.timeline({ ease: "power2.out" })

    gsap.set(boxImage, { opacity: .1 })

    tl
      .fromTo(boxTitle, {
        scaleY: 0,
        transformOrigin: "center center",
      }, {
        scaleY: 1,
        duration: 1,
        ease: "power3.inOut",
      })
      .from(firstTitle, {
        opacity: 0,
        y: -50,
        duration: 0.3,
      })
      .to(firstTitle, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        delay: 0.5,
      })
      .to(firstTitle, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
      })
      .from(secondTitle, {
        opacity: 0,
        y: -50,
        duration: 0.3,
      }, "-=0.5")
      .from(boxImage, {
        opacity: 0,
        duration: 1,
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="h-[91dvh] grid place-content-center relative text-own-white">
      <div id="box-title" className="absolute inset-0 bg-black rounded-3xl overflow-hidden">
        <img className="object-bottom absolute right-0 bottom-0" src={faceLee} alt="Lee Face" />
        <h1 id="first-title" className="absolute font-picnic text-5xl md:text-8xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">talent</h1>
        <h1 id="second-title" className="absolute font-satoshi text-5xl md:text-8xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">discipline</h1>
      </div>
    </section>
  )
}

export default Starting