import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { Link } from 'react-router-dom';

function ProfileSidebar() {
  return (
    <div className='hidden md:block bg-[#eaeafa9b] md:drop-shadow-2xl rounded-lg w-[14rem] h-[24rem] px-5 py-6'>
        <ul className='flex flex-col gap-4'>
        <Link to="/profile"><li className='cursor-pointer flex gap-4 items-center h-[3rem] w-[12rem] px-4  hover:bg-[#b5cbe9] hover:rounded-md'><RxAvatar className='text-2xl text-slate-700' /> <p className='text-2xl'>Home</p></li></Link>
        <Link to="trips"><li className='cursor-pointer flex gap-4 items-center h-[3rem] w-[12rem] px-4  hover:bg-[#b5cbe9] hover:rounded-md'><MdOutlineDirectionsBike className='text-2xl text-slate-700'/> <p className='text-2xl'>Trips</p></li></Link>
        </ul>
    </div>
  )
}

export default ProfileSidebar