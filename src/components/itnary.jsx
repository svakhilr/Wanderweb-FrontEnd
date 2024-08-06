import React,{useState} from 'react'

function Itnary({data}) {
    const [iscollapse,setCollapse] = useState(false)
    const handleCollapse = ()=>{
        setCollapse(!iscollapse)
    }
  return (!iscollapse?
    <div onClick={handleCollapse} className='block transition-all duration-300 ease-in-out cursor-pointer bg-slate-500 w-full rounded-lg'>
      <p className='p-6 '>{data.title} </p>
    </div>:
    <div onClick={handleCollapse} className='block cursor-pointer duration-300 ease-in-out bg-slate-500 w-full rounded-lg'>
        <div className='p-6 flex'>
         <div className='mr-5'>
          <p className=''>{data.title}</p>
          <p className='mt-3'>{data.discription}</p>    
        </div>  
        <img className='mt-5 w-[10rem] h-[10rem]' src={data.image}/> 
        </div>
    </div>
  )
}

export default Itnary