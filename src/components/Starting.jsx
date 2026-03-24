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
    const rectFirstTitle = firstTitle.getBoundingClientRect()

    gsap.set(boxImage, { opacity: .1 })
    gsap.set(secondTitle, { y: -rectFirstTitle.width / 2 + 30, opacity: 0 })

    tl
      .fromTo(boxTitle, {
        scaleY: 0,
        transformOrigin: "center center",
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .from(firstTitle, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.5")
      .to(secondTitle, {
        // y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.75,
      })
      .to(secondTitle, {
        y: 0,
        duration: 0.3,
        delay: 0.5,
      })
      .to(firstTitle, {
        opacity: 0,
        y: 80,
        duration: 0.3,
      }, "<")
      .from(boxImage, {
        opacity: 0,
        duration: 1,
      }, "-=0.3")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="h-dvh grid place-content-center relative text-own-white">
      <div id="box-title" className="absolute inset-0 h-full bg-black overflow-hidden">
        <img className="object-bottom absolute right-0 bottom-0" src={faceLee} alt="Lee Face" />
        <h1 id="first-title" className="absolute font-picnic text-5xl md:text-8xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-own-pink">talent</h1>
        <h1 id="second-title" className="absolute font-picnic text-5xl md:text-8xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">discipline</h1>
      </div>
    </section>
  )
}

export default Starting