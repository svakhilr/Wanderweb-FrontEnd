import React,{useState,useContext} from 'react'
import bckg from '../assets/signup.jpg'
import Header from '../components/header'
import Footer from '../components/footer'
import requests from '../constant/requests'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { userContext } from '../store/authprovider'


function Otp() {
    const [input , setInput] = useState("")
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate()
    const {login,getUser} = useContext(userContext)
    
    console.log("otpppppppp",email)

    const handleChange = (event)=>{
        setInput(event.target.value)
    }
    console.log(input)
    
    const verifyOtp = async ()=>{
        const formData = {
            email:email,
            otp:input
        }

        const requestBody = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        
        const response = await fetch(requests.verifyOtp,requestBody)
        const responseData =  await response.json()
        
        if (responseData.success){
            console.log(responseData)
            login(responseData.data)
            navigate("/")
            toast.success("Successfully Verified")
        }
        else{
            console.log(responseData.message.message)
            toast.error(responseData.message.message)
        }
    }
   
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        verifyOtp() 
    }

  return (
    <div className='min-h-screen bg-cover ' style={{ backgroundImage: `url(${bckg})` }}>
      <Header/>
      <div className='min-h-screen '>
        <div className='flex justify-center'>
        <div className='bg-gray-900 bg-opacity-55 flex justify-center mt-[20rem] w-[30rem]'>
            <form onSubmit={handleSubmit} className='p-7 flex  flex-col  justify-center'>
                <input className='mt-8 px-4 pt-8 pb-2 outline-none rounded-md text-2xl' onChange={handleChange} type='string' />
                <button  className='mt-6 bg-stone-800 hover:bg-stone-950 py-3 rounded-3xl text-white'>Verify</button>
            </form>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}


export default Otp