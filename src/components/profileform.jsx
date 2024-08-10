import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik';
import requests from '../constant/requests';

function ProfileForm() {
  
  const [userData,setUserdata] = useState(null)
  const [isEdit,setIsedit] = useState(false)
 
  const toggleEdit = ()=>{
    setIsedit(!isEdit)
  }
 
  const submitData = ()=>{

  }

  const {handleSubmit,touched,handleChange,setFieldValue,handleBlur,values,errors} = useFormik({
    initialValues: {
        email: '',
        profile_name:'',
    
    },
    // validationSchema:signInschema,
    onSubmit: submitData
     
    
  });

  const getUserdata = async ()=>{
    const accessToken = localStorage.getItem("accessToken")
    console.log("access",accessToken)
    const requestBody = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }
    }
    try{
      const response = await fetch(requests.getProfile,requestBody)
      const responseData = await response.json()
      if (responseData.success){
        setUserdata(responseData.data)
        setFieldValue('profile_name',responseData.data.profile_name)
        setFieldValue('email',responseData.data.email)
      }
      else{
        console.log(responseData)
      }
    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    console.log("user profile")
    getUserdata()
    
  },[isEdit])
  
  



  console.log("values",userData?.email,values.email)
  return (
    userData?
    <div className='relative bg-[#eaeafa9b] drop-shadow-xl w-3/4 rounded-lg'>
     
     <div className={`absolute top-6  ${!isEdit?'right-[10rem]':'right-5'}`}>
      {!isEdit?
        <p onClick={toggleEdit} className='cursor-pointer drop-shadow-xl rounded-md text-2xl border py-3 px-12 bg-gradient-to-r from-blue-500 to-green-500'>Edit</p>
     :
     <div className='flex gap-3'>
        <p onClick={toggleEdit} className='cursor-pointer rounded-md text-2xl border py-3 px-12 bg-gradient-to-r from-blue-500 to-green-500'>Cancel</p>
        <p className='cursor-pointer rounded-md text-2xl border py-3 px-12 bg-gradient-to-r from-blue-500 to-green-500'>Save</p>
     </div>
      }
     </div>

      <form className='mt-20 ml-20 flex flex-col w-[20rem] gap-5' onSubmit={handleSubmit}>
            <div className='flex gap-6 items-center'>
              <p className='text-2xl' >ProfileName:</p>
              <input className={`w-[20rem] outline-none rounded-md px-8 py-3 ${errors.email&&touched.email?'outline-3 outline-red-500':''}`}  id="profile_name"  name="profile_name"  type="text" onChange={handleChange}
                 onBlur={handleBlur} value={values.profile_name} readOnly={!isEdit}  />
               {/* {errors.email && touched.email ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.email}</p> : ""} */}
            </div>
            <div className='flex gap-6 items-center mt-4'>
            <p className='text-2xl' >Email:</p>
              <input className={`w-[20rem] ml-[5rem] outline-none rounded-md px-8 py-3 ${errors.password&&touched.password?'outline-3 outline-red-500':''}`}  id="email"  name="email"  type="email" onChange={handleChange}
                 onBlur={handleBlur} value={values.email}  readOnly={!isEdit} /> 
               {/* {errors.password && touched.password ? <p className='text-red-600 text-[14px] mt-2 ml-6'>{errors.password}</p> : ""} */}
            </div>
            
     </form>
    </div>:<></>
  )
}

export default ProfileForm