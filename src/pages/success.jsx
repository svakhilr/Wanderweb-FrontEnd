import checkmark from "../assets/checkmark.png"
import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import requests from "../constant/requests";
import { toast } from "react-toastify";

function Success() {

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const [paymentData, setPaymentdata] = useState(null)
  // console.log("bookking id",bookingId)

  const handlePaymentsuccess = async () => {
    const acessToken = localStorage.getItem("accessToken")
    const formData = {
      "session_id": sessionId
    }

    const requestBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${acessToken}`
      },
      body: JSON.stringify(formData),
    }
    try {
      const response = await fetch(requests.paymentSuccess, requestBody)
      const responseData = await response.json()
      if (responseData.success) {
        setPaymentdata(responseData.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handlePaymentsuccess()
    toast.success("PaymentSuccess!");
  }, [])

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#d1d5db]">
        <div className=" pt-[10rem] flex justify-center">
          {paymentData ? <div className="bg-[#f1f5f9] rounded-2xl w-[30rem]">
            <div className="flex flex-col items-center">
              <img className="w-[8rem]" src={checkmark} />
              <p className="text-2xl text-slate-500">Payment Success!</p>
              <p className="mt-2 text-[2rem]">INR {paymentData.total_amount}</p>
            </div>
            <div className="flex flex-col gap-5 px-10 mt-8 pb-10">
              <div className="flex justify-between">
                <p className="text-slate-500">Booking Number</p>
                <p>{paymentData.booking_id}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-500">Booker Name</p>
                <p>{paymentData.booker_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-500" >Package Name</p>
                <p>{paymentData.package_name}</p>
              </div>
            </div>
          </div> : <></>}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Success