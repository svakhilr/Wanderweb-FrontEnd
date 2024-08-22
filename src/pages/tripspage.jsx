import React,{useState,useEffect} from 'react'
import Header from '../components/header'
import Footer from '../components/footer';
import home from '../assets/ledakh.jpg'
import requests from '../constant/requests';
import { Link } from 'react-router-dom';
import Packagecard from '../components/packagecards';
import { ShimmerSimpleGallery } from "react-shimmer-effects";


function Tripspage() {
  const [filterdata,setFilterdata] = useState(null)
  const [sort,setSort]  = useState("default")
  const [tripdatas,setData] = useState(null)
  console.log("trips",filterdata)
  console.log("rendering")
  const getData = async()=>{
    const data = await fetch(requests.getTrips)
    const jsonData = await data.json()
    console.log(jsonData)
    setData(jsonData.data)
    setFilterdata(jsonData.data)
  }

  const sortData = (value)=>{
    console.log("sorting",value)
    if(value ==='asc'){
      const datas = filterdata.sort((a,b)=> a.price_per_head-b.price_per_head)
      setFilterdata(datas)
    }

    else if(value === 'desc'){
      console.log("descc",filterdata)
      const datas = filterdata.sort((a,b)=> b.price_per_head-a.price_per_head)
      // console.log(datas.slice(0,2))
      setFilterdata(datas)
    }
  }

  useEffect(()=>{
      getData()
  },[])
  

  const filterData = (event)=>{
    const search = event.target.value.toLowerCase()
    const datas = tripdatas.filter((tripsata) =>  (tripsata.package_name.toLowerCase().includes(search)|| tripsata.location.toLowerCase().includes(search)))
    setFilterdata(datas)
    console.log("filter",datas)
  }
  

  return (
    <div>
     <div className="relative min-h-screen bg-cover" style={{ backgroundImage: `url(${home})` }}>
      <div className='absolute flex flex-col text-center font-cursive w-[20rem] top-[15rem] left-[10%] md:left-[40%]'>
      <p className='text-[4rem]'>A Journey Of A Thousand Miles Begins With A Single Step </p>
      <p className='text-[3rem]'>-Lao Tzu</p>
      </div>
     <Header/>
     </div>
     <section className='flex justify-center  bg-amber-100'>
        <div className='py-24 basis-[80%]'>
            <div className='flex flex-col gap-5 items-center md:flex-row md:justify-between md:items-end'>
                <div className='flex flex-col gap-5'>
                <label className='text-2xl font-medium'>Packages</label>
                <input className='w-[23rem] p-4 rounded-md' placeholder='Search by package name or location' onChange={filterData} />
                </div>
                <div className=' cursor-pointer relative '>
                  <select value={sort} onChange={e => sortData(e.target.value)} className=' w-[23rem] pr-3 outline-none border-2  pl-2 py-3 '>
                  <option value="default">Sort By</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price:High to Low</option>
                  </select>
                 
                </div>
            </div>
            {tripdatas?(
      
               <div className='flex flex-wrap justify- mt-14 gap-[5.4rem]'>
               {filterdata.map((data)=>{ return( <Link key={data.id} to={`/tripdetail/${data.id}`}> <Packagecard  data={data}/> </Link>)})}
             </div>
            ):<ShimmerSimpleGallery card imageHeight={300} caption />}
          
          
            
        </div>
     </section>
     <Footer/>
    </div>
  )
}

export default Tripspage
