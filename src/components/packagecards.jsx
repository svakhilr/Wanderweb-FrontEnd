import React from 'react'

function Packagecards({data}) {
    console.log("packegejscx")
  return (
    <div className='cursor-pointer  w-[370px]  lg:w-[450px] lg:h-[350px] mb-5 '>
     <img className='h-full w-full overflow-hidden transition-transform duration-300 transform hover:scale-[1.01] object-cover rounded-xl' src={data.package_banner_image}/>
    <div className='mt-3 ml-2'>
    <p className='text-2xl'>{data.package_name}</p>
    <p>{data.location}</p>
    <p>₹ {data.price_per_head}</p>
    </div>
    </div>

  )
}

export default Packagecards