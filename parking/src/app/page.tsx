import ParkPlace from './park/page'

export default function Home() {
  return (
    <main className='container' >
      <h1 className='text-3xl pt-10 px-10 font-bold text-slate-700'>Estacionamento</h1>
      <ParkPlace></ParkPlace>
    </main>
  )
}
