import React,{useState} from 'react'
import Header from '../components/header'
import home from '../assets/home.png'
import Travelcard from '../components/travelcard'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'

function Homepage() {
  const [istoggle,setToggle] = useState(false)
  return (
    <div>
      <div className="min-h-screen bg-cover relative" style={{ backgroundImage: `url(${home})` }}>
        <Header />
        <p className='absolute font-metamise  top-[20rem] md:top-[24rem] left-8 text-[4.6rem] md:text-6xl leading-tight'>Enjoy The Freedom Of <span className='text-[6rem] ml-5 md:text-[10rem]'>Limitless</span></p>
      </div>
      <div className='bg-gradient-to-r from-amber-200 to-orange-200 px-5'>
        <div className='pt-10  md:ml-40 md:pb-24 flex flex-col justify-center items-center gap-6 md:flex-row md:gap-12'>
          {Array(3).fill().map(() => <Travelcard />)}
        </div>
        <div className='flex flex-col gap-6 md:flex-row md:justify-center md:gap-32 mt-10 pb-10'>
          <div className='basis-1/4 mt-7'>
            <p className='text-5xl md:text-6xl leading-tight'>Your Perfect Travel Partner <span>WanderWeb</span></p>
            
            <form className='md:relative mt-9'>
              <input className='w-[100%] p-3 rounded-full pl-9' placeholder='wanderweb@gmail.com' />
              <button className='sm:mt-3 md:absolute w-[100%] md:mt-0 md:w-auto md:right-0  px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-700'>Chat With Us</button>
            </form>
          </div>
          <div className=' shadow-lg shadow-cyan-500/50'>
            <img className='rounded-md ' src='https://www.shutterstock.com/image-photo/maldives-islands-ocean-tropical-beach-600nw-1938868960.jpg' />
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}

export default Homepage