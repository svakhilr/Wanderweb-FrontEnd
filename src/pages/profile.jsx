import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import ProfileSidebar from '../components/profilesidebar'
import { Outlet } from 'react-router-dom';

function Profile() {

  
  return (
    <div>
        <Header/>
        <div className='min-h-screen bg-[#fdc5c5]'>
           <div className='pt-48 px-28 flex gap-16'>
            <ProfileSidebar/>
            <Outlet/>
           </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile