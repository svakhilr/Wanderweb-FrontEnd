import React,{useContext} from 'react'
import bckg from '../assets/signup.jpg'
import Header from '../components/header'
import Footer from '../components/footer'
import { useFormik } from 'formik';
import signInschema from '../schemas/signin';
import requests from '../constant/requests';
import { userContext } from '../store/authprovider';
import {  useNavigate,useLocation } from 'react-router-dom';
import { toast } from "react-toastify";




function Signin() {
    const {login,getUser} = useContext(userContext)
    const navigate = useNavigate()
    const location = useLocation();

    

    const submitData = async (values,action)=>{
      console.log(values)
      const formData = {
        email:values.email,
        password:values.password
      }
      const requestBody = {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
     }
     try{
     const response = await fetch(requests.login,requestBody)
     const responseData = await response.json()
     
     console.log(responseData)
     if (responseData.success){
        login(responseData.data)
        const { from } = location.state || { from: { pathname: '/' } };
        console.log("from",from)
        navigate(from)
        toast.success("success");
     }
     else{
        toast.error(responseData.message.message)
     }
     }
     catch(error){
        console.log(error)
     }
    }
  
    const {handleSubmit,touched,handleChange,handleBlur,values,errors} = useFormik({
        initialValues: {
            email: '',
            password:'',
        
        },
        validationSchema:signInschema,
        onSubmit: submitData
         
        
      });

  return (
    <div className='min-h-screen bg-cover relative' style={{ backgroundImage: `url(${bckg})` }}>
    <Header/>
    <div className='min-h-screen flex flex-col justify-center items-center'>
    <div className='bg-gray-900 flex justify-center w-[30rem] bg-opacity-65'>
    <form className='mt-16   flex flex-col w-[20rem] gap-5' onSubmit={handleSubmit}>
              
             
            <div>
              <input className={`w-[20rem] outline-none rounded-3xl px-8 py-3 ${errors.email&&touched.email?'outline-3 outline-red-500':''}`}  id="email"  name="email"  type="email" onChange={handleChange}
                 onBlur={handleBlur} value={values.email} placeholder='email@gmail.com' />
               {errors.email && touched.email ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.email}</p> : ""}
            </div>
            <div>
              <input className={`w-[20rem] outline-none rounded-3xl px-8 py-3 ${errors.password&&touched.password?'outline-3 outline-red-500':''}`}  id="password"  name="password"  type="password" onChange={handleChange}
                 onBlur={handleBlur} value={values.password} placeholder='password' /> 
               {errors.password && touched.password ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.password}</p> : ""}
            </div>
            <button className='bg-stone-800 hover:bg-stone-950 mt-5 mb-14 py-3 rounded-3xl text-white' type="submit">Login</button>
     </form>
     </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Signin