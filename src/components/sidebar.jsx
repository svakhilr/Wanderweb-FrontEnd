import React,{useContext} from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { RiAliensFill,RiContactsBook2Fill,RiInformation2Fill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { FaLocationArrow } from "react-icons/fa";
import { userContext } from '../store/authprovider'
import { Link } from 'react-router-dom';


function Sidebar({istoggle,handletoggle}) {
  const {isloggedin} = useContext(userContext)
  
  return (
    istoggle?
    (<>
    <div className='fixed inset-0 z-40  bg-black bg-opacity-50' onClick={handletoggle}></div>
     <div className='fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-md transform '>
        
        <ul className='pl-5 pt-6 font-semibold'>
          <Link to='/'><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4 '><IoHomeSharp />Home</li> </Link>
          <Link to='/trips'><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><FaLocationArrow/>Trip</li></Link>
            <li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><ImLocation2 />Destination</li>
          <Link to='/about-us'><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><RiInformation2Fill/>About</li></Link>
            <li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><RiContactsBook2Fill/>Contact</li>
            {isloggedin?
          <>  
          <Link to="/profile"><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><RiAliensFill/>Profile</li> </Link>
          <Link to="/profile/trips"><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><RiAliensFill/>Orders</li> </Link>
          </>:
          <Link to="/signin"><li className='flex items-center gap-2 cursor-pointer hover:opacity-25 mb-4'><RiAliensFill/>Sign In</li></Link>}
            
        </ul>
    
    </div>
    </>
    ):""
  )
}

export default Sidebar