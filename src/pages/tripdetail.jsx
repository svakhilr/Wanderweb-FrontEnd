import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../components/header'
import requests from '../constant/requests'
import Itnary from '../components/itnary'
import Accordian from '../components/accordian'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'

function Tripdetail() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const request = requests.getTrips + id


    const retrieveData = async () => {
        try {
            const response = await fetch(request)

            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json()
            console.log(responseData.data)
            setData(responseData.data)
            console.log(responseData.data.exclusion.length)
        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        retrieveData()
    }, [])
    return (data ?
        <div className=''>
            <div className="min-h-screen relative  bg-cover" style={{ backgroundImage: `url(${data.package_banner_image})` }}>
                <p className='absolute font-metamise text-[10rem] top-[17rem]  left-[20%]'>{data.package_name}</p>
                <Header />
                <div className='hidden absolute top-[91%] md:flex flex-col justify-center items-center gap-3 right-48 border-2 rounded-md  border-black w-[16rem] bg-white p-5'>
                    <p className='text-2xl font-bold '>₹ {data.price_per_head}</p>
                    <p className=''>PER-HEAD</p>
                    <Link to={`/trip-booking?trip-id=${id}`}><p className='cursor-pointer py-2 border bg-orange-500 w-[12rem] rounded-md flex  justify-center'>Book Now</p></Link>
                </div>
            </div>

            <div className='px-7 md:px-20 mt-10 mb-8 md:mb-44'>
                <p className='text-2xl font-bold'>{data.package_name}</p>
                <p className='mt-3 md:w-[80rem]'>{data.package_discription}</p>
                <div className='md:flex md:gap-[6rem]'>
                    <div className='md:basis-1/2'>
                        <p className='text-2xl mt-4 font-bold'>Itnary</p>
                        <div className='mt-4 flex flex-col gap-5'>
                            {data.itnary.map((itnary) => <Itnary key={itnary.id} data={itnary} />)}

                        </div>
                    </div>
                    <div className='flex flex-col gap-8 mt-20'>
                        <div className=''>
                            {data.inclusion.length > 0 && <Accordian datas={data.inclusion} type={'inclusion'} />}
                            {data.exclusion.length > 0 && <Accordian datas={data.exclusion} type={'exclusion'} />}
                        </div>

                    </div>
                </div>
            
            </div>
            <div className='md:hidden border-2 mb-3'>
                <div className='flex gap-3 mb-4 justify-center items-center py-2'>
                <p className='text-2xl font-bold '>₹ {data.price_per_head}</p>
                <p className=''>PER-HEAD</p>
                </div>
                <Link to={`/trip-booking?trip-id=${id}`}><p className='cursor-pointer py-2 border bg-[#69e33d] hover:bg-[#dffbd5]  w-[100%] rounded-md flex  justify-center'>Book Now</p></Link>
            </div>
            <Footer />
        </div>
        : <></>

    )
}

export default Tripdetail