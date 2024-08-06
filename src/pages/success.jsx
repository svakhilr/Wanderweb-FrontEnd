import checkmark from "../assets/checkmark.png"
import Header from "../components/header";
import Footer from "../components/footer";
import { useState,useEffect } from "react";

function Success() {
  
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('session_id');
  console.log("bookking id",bookingId)
  useEffect(()=>{

  },[])

  return (
    <div>
      <Header/>
        <div className="min-h-screen bg-[#d1d5db]">
          <div className=" pt-[10rem] flex justify-center">
            <div className="bg-[#f1f5f9] rounded-2xl w-[30rem]">
            <div className="flex flex-col items-center">
              <img className="w-[8rem]" src={checkmark}/>
              <p className="text-2xl text-slate-500">Payment Success!</p>
              <p className="mt-2 text-[2rem]">INR 2000</p>
            </div>
            <div className="flex flex-col gap-5 px-10 mt-8 pb-10">
              <div className="flex justify-between">
                <p className="text-slate-500">Booking Number</p>
                <p>IN40001</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-500">Booker Name</p>
                <p>Akhil</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-500" >Package Name</p>
                <p>Kasmir</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Success