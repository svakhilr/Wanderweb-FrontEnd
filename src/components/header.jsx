import React,{useState,useEffect,useContext} from 'react'
import logo from '../assets/logo.png'
import { IoHomeSharp } from "react-icons/io5";
import { RiAliensFill,RiContactsBook2Fill,RiInformation2Fill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { FaLocationArrow } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

import Sidebar from './sidebar';
import { userContext } from '../store/authprovider'
import requests from '../constant/requests';



function Header() {
  const [istoggleSidebar, settoggleSidebar] = useState(false)
  const {isloggedin,logOut} = useContext(userContext)
  
  
  let profileName = localStorage.getItem("profileName")
  
 
  const handletoggle = ()=>{
    settoggleSidebar(!istoggleSidebar)
  }
  
  // useEffect(()=>{
  //   console.log("headereffect",isloggedin)
  //   if(isloggedin){
      
  //     console.log("llooofhd")
      
  //   }
  // },[isloggedin])
  

  return (
    <>
    <Sidebar istoggle={istoggleSidebar}  handletoggle={handletoggle}/>
    <div className='lg:flex justify-center relative'>
     
      <header className='fixed z-30 h-16 w-full  flex items-center bg-amber-100 bg-opacity-50 '>
      <div className='px-5 w-full md:px-[8rem]   flex justify-between items-center'>
        <div className='cursor-pointer flex items-center gap-2 '>
          <img src={logo} className='h-20 mt-4'/>
          <p  className='md:text-[1.5rem] lg:text-[1.8rem] font-ga-maamli-regular'>WanderWeb</p>
        </div>
        <ul className='hidden lg:flex gap-8  font-bold'>
          <Link to='/'>  <li className='flex items-center gap-2 cursor-pointer hover:opacity-25'><IoHomeSharp />Home</li> </Link>
          <Link to ='/trips'>  <li className='flex items-center gap-2 cursor-pointer hover:opacity-25'><FaLocationArrow/>Trip</li></Link>
            <li className='flex items-center gap-2 cursor-pointer hover:opacity-25'><ImLocation2 />Destination</li>
            <li className='flex items-center gap-2 cursor-pointer hover:opacity-25'><RiInformation2Fill/>About</li>
            <li className='flex items-center gap-2 cursor-pointer hover:opacity-25'><RiContactsBook2Fill/>Contact</li>
        </ul>
        {isloggedin?
        <div className='hidden lg:flex gap-14'>
        <p className=' flex items-center gap-2  font-bold hover:opacity-25'><RiAliensFill /> Hello {profileName}</p>
        <p onClick={logOut} className='cursor-pointer font-bold hover:opacity-25'>Logout</p>
        </div>
        :
        <Link to="/signin"><p className='hidden lg:flex items-center gap-2 cursor-pointer font-bold hover:opacity-25'><RiAliensFill /> Login</p></Link>
        }
        <div className='lg:hidden' onClick={handletoggle}>
          <RxHamburgerMenu  className='cursor-pointer text-[1.5rem] md:text-[2rem]'/>
        </div>
      </div>
    </header>
    
    </div>
    </>
  )
}

export default Header