import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className='flex flex-col items-center md:flex-row md:justify-around md:items-center md:py-6 md:pr-56 bg-gradient-to-b from-orange-200 to-amber-200 '>
        <div className='flex items-center gap-4 '>
           <img className='h-40 mt-3' src={logo}/> 
           <h1 className='text-3xl md:mb-4'>WanderWeb</h1>
        </div>
        <ul className='flex flex-col gap-1 md:gap-3'>
            <li>About Us</li>
            <li>Company</li>
            <li>Careers</li>
            <li>Blog</li>
        </ul>
        <ul className='flex flex-col gap-3'>
            <li>About Us</li>
            <li>Company</li>
            <li>Careers</li>
            <li>Blog</li>
        </ul>
        <ul className='flex flex-col gap-3'>
            <li>About Us</li>
            <li>Company</li>
            <li>Careers</li>
            <li>Blog</li>
        </ul>
        <ul className='flex flex-col gap-3'>
            <li>About Us</li>
            <li>Company</li>
            <li>Careers</li>
            <li>Blog</li>
        </ul>
    </footer>
  )
}

export default Footer