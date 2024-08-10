import React from 'react'
import bckg from '../assets/signup.jpg'
import Header from '../components/header'
import { useFormik } from 'formik';
import signup from '../assets/login.jpg';
import Footer from '../components/footer';
import signupschema from '../schemas/signup';
import requests from '../constant/requests';
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
   
   const navigate = useNavigate()
  
   const submitData = async (values,actions)=>{
      
      const formData = {
         profile_name:values.profile_name,
         email:values.email,
         password:values.password,
         confirm_password:values.confirmpassword
      };

      const requestBody = {
         method: 'POST',
         headers: {
               'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      }
      try{
         const response = await fetch(requests.registerCustomer,requestBody)
         const responseData = await response.json()
         if (responseData.success){
            navigate("/otp/verify",{ state: { email:values.email } })
            toast.success("success");
         }
         else{
            console.log(responseData)
            toast.success("Email Already Exist")
            throw new Error(response.status)
         }
      console.log(responseData)
      }catch(error){
         console.log(error)
      }
   }
    
    const {handleSubmit,touched,handleChange,handleBlur,values,errors} = useFormik({
        initialValues: {
         profile_name: '',
            
            email: '',
            password:'',
            confirmpassword:''
        },
        validationSchema:signupschema,
        onSubmit: submitData
         
        
      });
      console.log(touched)
  return (
    <div className='min-h-screen bg-cover relative' style={{ backgroundImage: `url(${bckg})` }}>
       <Header/>
       <div className='min-h-screen'>
       <div className='flex  justify-center mt-[10rem] mb-12'>
           <div className='bg-gray-900 flex flex-col  items-center w-[30rem] bg-opacity-65'>
            <p className='mt-10 text-2xl text-white' >Sign Up</p>
            <form className='mt-10   flex flex-col w-[20rem] gap-5' onSubmit={handleSubmit}>
              
              <div>
              <input className={`w-[20rem] outline-none rounded-3xl px-8 py-3 ${errors.profile_name&&touched.profile_name?'outline-3 outline-red-500':''}`}  id="profile_name"  name="profile_name"  type="text" onChange={handleChange}
                 onBlur={handleBlur} value={values.profile_name} placeholder='Profie Name' /> 
               {errors.profile_name && touched.profile_name ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.profile_name}</p> : ""}
               </div>
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
             
             <div>
              <input className={`w-[20rem] outline-none rounded-3xl px-8 py-3 ${errors.confirmpassword&&touched.confirmpassword?'outline-3 outline-red-500':''}`}  id="confirmpassword"  name="confirmpassword"  type="password" onChange={handleChange}
                 onBlur={handleBlur} value={values.confirmpassword} placeholder='confirm-password' />    
               {errors.confirmpassword && touched.confirmpassword ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.confirmpassword}</p> : ""} 
               </div> 
              
               <button className='bg-stone-800 hover:bg-stone-950 py-3 rounded-3xl text-white' type="submit">Submit</button>
            </form>
            <p className='mt-6 text-white text-[1.3rem]'>Already Registered?<span className='text-[2rem] ml-3 cursor-pointer'><Link to='/signin'>Signin</Link> </span></p>
           </div>
           <div>
            <img className='w-[30rem] h-[35rem]' src={signup}/>
           </div>
       </div>
       </div>
       <Footer/>
    </div>
  )
}

export default Signup