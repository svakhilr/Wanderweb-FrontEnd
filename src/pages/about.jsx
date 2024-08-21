import React from 'react'
import Header from '../components/header'
import banner from '../assets/aboutbanner.jpg'

function About() {
    return (
        <>
            <div className='min-h-[40rem] bg-cover' style={{ backgroundImage: `url(${banner})` }}>
                <Header />
            </div>
            <div className='md:px-[8rem] px-3  pt-[7rem] pb-[4rem] md:pb-[12rem]  bg-[#94dfff] md:flex gap-[24rem]'>
                <div className='relative'>
                    <img className='rounded-lg h-[18rem]' src='https://st2.depositphotos.com/1013513/7548/i/450/depositphotos_75481827-stock-photo-happy-family-jumping-together-on.jpg'/>
                    <img className='md:absolute  md:h-[16rem] md:top-[50%] md:left-1/2 w-[420px] rounded-lg' src='https://img.traveltriangle.com/blog/wp-content/uploads/2018/03/family-travel-tips_23rd-oct.jpg'/>
                </div>
                <div className='md:basis-[40%] '>
                    <p className='text-4xl text-center font-bold font-mono'>We Offer You Our Best</p>
                    <p className='mt-4 text-[1.6rem] font-cursive'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                    a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word 
                    in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
                    This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About