import fullBody from '@assets/full-body-lee-color.png'
import konoha from '@assets/konoha-symbol.svg'

function BentoMatriz() {
  return (
    <section className="grid grid-cols-1 gap-4 text-own-white md:grid-cols-4 md:grid-rows-4">
      <div className="rounded-xl flex min-h-40 flex-col overflow-clip md:row-span-2">
        <div className="bg-own-skin h-full"></div>
        <div className="bg-own-green h-full"></div>
        <div className="bg-own-pink h-full"></div>
      </div>
      <div className="bg-black rounded-xl p-5 grid place-content-center">2</div>
      <div className="bg-black rounded-xl p-5 grid place-content-center">3</div>
      <div className="bg-black rounded-xl p-5 grid place-content-center md:row-span-2">4</div>
      <div className="relative rounded-xl bg-black grid place-content-center min-h-65 md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-2">
        <h2 className='text-6xl md:text-7xl lg:text-9xl font-picnic text-own-white'>Rock Lee</h2>
        <div className="absolute inset-0 rounded-xl [clip-path:inset(-50%_0_0_0)]">
          <img className="h-full w-full object-contain scale-150 lg:scale-180" src={fullBody} alt="" />
        </div>
      </div>
      <div className="bg-black rounded-xl p-5 text-2xl md:row-span-2 md:row-start-3 md:[writing-mode:vertical-lr] md:rotate-180 md:text-3xl">Lorem ipsum</div>
      <div className="bg-black rounded-xl p-5 grid place-content-center md:col-start-2 md:row-start-4">7</div>
      <div className="rounded-xl p-5 bg-black flex items-center justify-center md:col-start-4 md:row-start-3">
        <img className='object-cover' src={konoha} alt="Konoha Symbol" />
      </div>
      <div className="bg-black rounded-xl p-5 flex items-center justify-center md:col-span-2 md:col-start-3 md:row-start-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </section>
  )
}

export default BentoMatriz