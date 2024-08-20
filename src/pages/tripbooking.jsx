import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import bckg from '../assets/travel.jpg'
import requests from '../constant/requests'
import { useFormik } from 'formik';
import bookingSchema from '../schemas/bookingschema'
import { useNavigate,createSearchParams } from 'react-router-dom'

function Tripbooking() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const tripId = params.get('trip-id')
    const navigate = useNavigate()
    const request = requests.getTrips + tripId
    const [tripData, setTripdata] = useState(null)
    const [totalamount, setTotalamount] = useState(0)
    const [guestNumber, setGuestnumber] = useState(1)

    const submitFormdata = async (formData)=>{
        console.log("formd",formData)
        const aceessToken = localStorage.getItem("accessToken")
        const requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aceessToken}`
            },
            body: JSON.stringify(formData),
         }

         try{
           const response = await fetch(requests.confirmBooking,requestBody)
           const responseData = await response.json()
           if(responseData.success){
            console.log(responseData.data)
            navigate(`/trip-payment?${createSearchParams({bookingid:responseData.data.booking_id})}`)
           }
           else{
            responseData
           }
         }catch(error){
            console.log(error)
         }
    }

    const submitData = (values,actions) => {

        const formData = {
            booker_name:values.bookername,
            contact_number:values.contactnumber,
            total_participants:values.guestnumbers,
            booker_email:values.email,
            starting_date:values.startingdate,
            package_id:tripId
        }
        submitFormdata(formData)
    }

    

    const { handleSubmit, touched, handleChange, handleBlur, values, errors } = useFormik({
        initialValues: {
            bookername:'',
            email: '',
            contactnumber: '',
            startingdate: '',
            guestnumbers: '1'
        },
        
        validationSchema:bookingSchema,
        onSubmit: submitData


    });

    console.log("errr",errors)


    const fetchTripdetail = async () => {
        try {
            const response = await fetch(request)
            const responseData = await response.json()
            console.log(responseData)
            setTripdata(responseData.data)
            setTotalamount(responseData.data.price_per_head)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("tripbooking use", tripId)
        fetchTripdetail()
    }, [])

    useEffect(() => {
        console.log("second effect")
        setGuestnumber(values.guestnumbers)
        const amount = tripData?.price_per_head * values.guestnumbers
        setTotalamount(amount)
    }, [values.guestnumbers])

    return (
        tripData ?
            (<div>
                <div className='min-h-screen bg-cover relative' style={{ backgroundImage: `url(${bckg})` }}>
                <p className='absolute font-metamise text-[8rem] top-[20rem] left-[10%]'>Make Your Trip On!!!!!</p>
                <Header />
                </div>
                <div className='my-6  mb-16 px-14'>
                    <p className='font-mono text-2xl font-bold'>Booking Details</p>
                    <div className='md:flex flex-row  gap-14 mt-14'>
                        <div className='basis-1/2'>
                            <div className='flex gap-12'>
                                <img className='w-[10rem] h-[5rem] md:w-[25rem] md:h-[10rem] rounded-md' src={tripData.package_banner_image} />
                                <div className='flex flex-col gap-1'>
                                    <p className='md:text-2xl font-semibold'>{tripData.package_name}</p>
                                    <p>{tripData.location}</p>
                                    <p>{tripData.days} Days</p>
                                    <p>₹ {tripData.price_per_head} Per Head</p>
                                </div>
                            </div>
                            <div className='border-2 border-gray-950 shadow-2xl rounded-md mt-10 md:mt-24 md:w-[25rem] px-6 py-10'>
                                <div className='flex justify-between text-[0.9rem] md:text-[1.2rem] font-bold mb-6'>
                                    <p className=''>Number of people</p>
                                    <p>{guestNumber}</p>
                                </div>
                                <div className='flex justify-between text-[0.9rem] md:text-[1.2rem] font-bold'>
                                    <p>Total Amount</p>
                                    <p>₹ {totalamount}</p>
                                </div>
                            </div>
                        </div>
                        <div className='basis-1/2 '>
                            <div className='hidden md:flex justify-between'>
                                <div>
                                    <p className='md:text-3xl mb-10 ml-8'>Location</p>
                                    <p className='border-2 cursor-pointer w-[14rem] py-8 text-center rounded-md text-[1.4rem] bg-gradient-to-r from-[#a3e635] to-[#176604] hover:from-[#f59e0b] hover:to-[#ea580c] '>Kerala</p>
                                </div>
                                <div>
                                    <p className='text-3xl mb-10 ml-8'>Package</p>
                                    <p className='border-2 cursor-pointer w-[14rem] py-8 text-center rounded-md text-[1.4rem] bg-gradient-to-r from-[#a3e635] to-[#176604] hover:from-[#f59e0b] hover:to-[#ea580c] '>Kashmir</p>
                                </div>
                            </div>
                            <div className='mt-14'>
                                <form onSubmit={handleSubmit}>

                                    <div className="relative py-1 mb-2 w-[100%]">
                                        <input type="text" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                            placeholder="" value={values.bookername} onChange={handleChange} onBlur={handleBlur} name="bookername" id="bookername" />
                                        <label htmlFor="contactnumber" class="peer-focus:font-medium  absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Booker Name</label>
                                        {errors.bookername && touched.bookername ? <p className='text-red-600 text-[14px] mt-2 '>{errors.bookername}</p> : ""}
                                    </div>

                                    <div className='md:flex justify-between'>
                                        <div className="relative py-1 mt-2 w-[100%] md:w-[40%]">
                                            <input type="input" className={`block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer`}
                                                placeholder="" value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" id="email" />
                                            <label htmlFor="email" class="peer-focus:font-medium  absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                            {errors.email && touched.email ? <p className='text-red-600 text-[14px] mt-2 '>{errors.email}</p> : ""}
                                        </div>
                                        
                                        <div className="relative py-1 mt-2 md:w-[40%]">
                                            <input type="tel" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                                placeholder="" value={values.contactnumber} onChange={handleChange} onBlur={handleBlur} name="contactnumber" id="contactnumber" />
                                            <label htmlFor="contactnumber" class="peer-focus:font-medium  absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
                                            {errors.contactnumber && touched.contactnumber ? <p className='text-red-600 text-[14px] mt-2 '>{errors.contactnumber}</p> : ""}
                                        </div>
                                    </div>

                                    <div className='md:flex justify-between mt-10'>
                                        <div className="relative  py-1 mt-2 md:w-[40%]">
                                            <input type="date" min={new Date().toISOString().split("T")[0]} className="block cursor-pointer py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                                placeholder="" value={values.startingdate} onChange={handleChange} onBlur={handleBlur} name="startingdate" id="startingdate" />
                                            <label htmlFor="startingdate" class="peer-focus:font-medium  absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Starting Date</label>
                                            {errors.startingdate && touched.startingdate ? <p className='text-red-600 text-[14px] mt-2 '>{errors.startingdate}</p> : ""}
                                        </div>

                                        <div className="relative py-1 mt-5   md:mt-2 md:w-[40%]">
                                            <input type="number" min="1" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                                placeholder="" value={values.guestnumbers} onChange={handleChange} onBlur={handleBlur} name="guestnumbers" id="contactnumber" />
                                            <label htmlFor="name" class="peer-focus:font-medium  absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number Of Guests </label>
                                        </div>
                                    </div>

                                    <button className='mt-10 border-2 rounded-md p-4 bg-gradient-to-r from-[#a3e635] to-[#176604] hover:bg-green-700' type='submit'>Confirm Booking</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>) :
            <></>
    )
}

export default Tripbooking