import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import requests from '../constant/requests';
import { useLocation,useNavigate } from 'react-router-dom';


function Trippayment() {
  const [bookingData, setBookingdata] = useState(null)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingid');
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate()
  // console.log(params)


  const handlePayment = async () =>{
    console.log("handle payment")
    const formData = {
      booking_id:bookingId,
      amount:bookingData.total_amount,
      package_name:bookingData.package_name
    }

    const requestBody = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body:JSON.stringify(formData)
    }

    try{
      const response = await fetch(requests.checkout,requestBody)
      const responseData = await response.json()
      if(responseData.success){
        console.log("respone",responseData.data.url)
        window.location.href = responseData.data.url
      }
    }catch(error){
      console.log(error)
    }
  }

  const getBookingdata = async () => {
    const request = requests.getTripbooking + bookingId
    const requestBody = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    }
    try {
      const response = await fetch(request, requestBody)
      const responseData = await response.json()
      if (responseData.success) {
        console.log("success",responseData.data)
        setBookingdata(responseData.data[0])
      }
      else {
        console.log("error", responseData)
      }
    } catch (error) {
      console.log("error", error)
    }

  }

  useEffect(() => {
    getBookingdata()

  }, [])

  return (
    <div>
      <Header />
      <div className='min-h-screen  bg-gradient-to-r from-[#2e8010] via-[#b7f462] to-[#449825]'>
        <div className='pt-32 flex  justify-center'>
          <div className='bg-[#e3f4c2] mb-14 shadow-2xl p-7  rounded-md w-[34rem]'>
            <p className='text-3xl font-bold text-center'>Booking Details</p>
            {bookingData ?
              <>
                <div className='border-2 shadow-xl border-gray-500 rounded-md p-4 mt-5 flex flex-col gap-6'>
                  <p className='text-[1.5rem]'>Package Name : {bookingData.package_name} </p>
                  <p className='text-[1.5rem]'>Location : {bookingData.location} </p>
                  <p className='text-[1.5rem]'>Total Days : {bookingData.days} </p>
                  <p className='text-[1.5rem]'>Price Per Head  : {bookingData.price_per_head} </p>
                </div>
                <div className=' shadow-xl border-2 border-gray-500 rounded-md p-6  mt-10 flex flex-col gap-6'>
                  <p className='text-[1.5rem]'>Name : {bookingData.booker_name} </p>
                  <p className='text-[1.5rem]'>Email : {bookingData.booker_email} </p>                  
                  <p className='text-[1.5rem]'>Starting-Date : {bookingData.starting_date}</p>
                  <p className='text-[1.5rem]'>Ending-Date:{bookingData.ending_date}</p>
                  <p className='text-[1.5rem]'>Total Guests : {bookingData.total_participants} </p>
                  <p className='text-[1.5rem]'>Total Amount  :₹ {bookingData.total_amount} </p>
                </div>
                <div className='flex justify-center my-1'>
                  <button onClick={()=> handlePayment()} className='mt-5 rounded-xl font-serif bg-gradient-to-r from-amber-300 to-amber-700 px-8 py-4 text-2xl'>Proceed To Pay</button>
                </div>
              </>
              : <></>}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Trippayment