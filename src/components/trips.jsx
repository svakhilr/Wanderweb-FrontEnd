import React,{useState,useEffect} from 'react'
import requests from '../constant/requests'


function Trips() {
  const [tripdata,setTripdata] = useState(null)
 
  const getTripdata = async ()=>{
    const accessToken = localStorage.getItem("accessToken")
    const requestBody = {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    }
    try{
      const response = await fetch(requests.getbookings,requestBody)
      const responseData = await response.json()
      if(responseData.success){
        setTripdata(responseData.data)
      }
    }catch(error){
      console.log(error)
    }

  }

  useEffect(()=>{
      getTripdata()
  },[])
  return (
    tripdata?
    <div className='bg-[#0d0d0ed2] drop-shadow-xl mb-24 w-3/4 rounded-lg'>
      <div className='pt-11 px-10'>
        <table className='w-[100%]'>
          <thead className=' dark:bg-gray-700 dark:text-gray-400 rounded-lg'>
            <tr>
            <th className='px-6 py-4'>Booking ID</th>
            <th className='px-6 py-4'>Package Name</th>
            <th className='px-6 py-4'>Start Date</th>
            <th className='px-6 py-4'>End Date</th>
            <th className='px-6 py-4'>Total Amount</th>
            <th className='px-6 py-4'>Status</th>

            </tr>
          </thead>
          <tbody className='text-center text-white'>
            {tripdata.map((data)=> 
            <tr>
            <td className='px-6 py-4 '>{data.booking_id}</td>
            <td className='px-6 py-4'>{data.package_name}</td>
            <td className='px-6 py-4'>{data.starting_date}</td>
            <td className='px-6 py-4'>{data.ending_date}</td>
            <td className='px-6 py-4'>₹ {data.total_amount}</td>
            <td className='px-6 py-4'>{data.booking_status}</td>
          </tr>)
            }
          </tbody>
        </table>
       {/* {tripdata.map((data)=>
          <div className='flex justify-between text-[1.2rem]  text-white'>
          <p >{data.booking_id}</p>
          <p className='pl-5'>{data.package_name}</p>
          <p className='pl-14'>{data.starting_date}</p>
          <p>{data.ending_date}</p>
          <p>{data.total_amount}</p>
          <p>{data.booking_status}</p>
         </div> )} */}
       
        </div>

    </div>:<></>
  )
}

export default Trips