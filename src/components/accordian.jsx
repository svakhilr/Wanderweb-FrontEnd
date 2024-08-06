import React,{useState} from 'react'
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

function Accordian({datas,type}) {
    const [iscollapse,setCollapse] = useState(false)
    console.log(datas)
    const handleToggle= ()=>{
        setCollapse(!iscollapse)
    }
  return (
    <div className='border-2 px-4 md:w-[27rem] mb-6'>
        <h1 onClick={handleToggle} className='cursor-pointer text-2xl  mr-5 font-semibold flex justify-between'>
            {type=='inclusion'?'Inclusions':'Exclusions'}
            {!iscollapse?<FaChevronUp/>:<FaChevronDown/>}
            </h1>
            
        {(iscollapse && type=='inclusion') && datas.map((data)=>
        <div key={data.id} className='mt-4'>
        <p>{data.inclusion}</p>
        </div>)}

        {(iscollapse && type=='exclusion') && datas.map((data)=>
        <div className='mt-4'>
        <p key={data.id}>{data.exclusion}</p>
        </div>)}
        
    </div>
  )
}

export default Accordian
