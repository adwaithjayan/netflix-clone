import search_Icon from '../assets/search_icon.svg';
import logo from '../assets/logo.png';
import bell_icon from '../assets/bell_icon.svg';
import profile_img from '../assets/profile_img.png';
import caret_icon from '../assets/caret_icon.svg';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import netflix_spinner from '../assets/netflix_spinner.gif';


export default function Navbar() {
  const navref =useRef(null);
  const [loading,setLoading]=useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (navref.current) {
  //       const nav =navref.current;
  //       if (window.scrollY >= 80) {
  //         nav.classList.add('nav-dark');
  //       } else {
  //         nav.classList.remove('nav-dark');
  //       }
  //     }
  //   });
  // });
  const logout = async()=>{
    setLoading(true);
    try{
    signOut(auth);
    toast.success('logged out successfully');
  }
  catch(err){
    console.log(err);
  
  }
  finally{
    setLoading(false)
  }
    
}
  return (
    loading?<div className="w-full h-screen flex items-center justify-center">
      <img src={netflix_spinner} alt="loading" className="w-[60px]"/>
    </div>:
    <header ref={navref}
        style={{backgroundImage:'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%,transparent)'}}
       className='w-full py-5 px-[6%] flex justify-between fixed text-[14px] text-[#e5e5e5] z-10 mmd:py-5 mmd:px-[4%]'>
        <div className='flex items-center gap-[50px]'>
            <img src={logo} alt="logo" className='w-[90px] mmd:h-[25px] msm:h-5' />
            <ul className='flex gap-5 mmd:hidden'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>TV Shows</li>
                <li className='cursor-pointer'>Movies</li>
                <li className='cursor-pointer'>New & Popular</li>
                <li className='cursor-pointer'>My List</li>
                <li className='cursor-pointer'>Browse by Languages</li>
            </ul>
        </div>
        <div className='flex gap-5 items-center msm:gap-2.5'>
            <img src={search_Icon} alt="search" className='w-5 cursor-pointer'/>
            <p>Children</p>
            <img src={bell_icon} alt="bell" className='w-5 cursor-pointer'/>
            <div className='flex items-center gap-2.5 cursor-pointer relative group'>
                <img src={profile_img} alt="profile"  className='rounded w-[35px] '/>
                <img src={caret_icon} alt="dropdown" />
                <div className='absolute top-[100%] right-0 w-max bg-[#191919] rounded-[2px] py-[18px] px-[22px]  z-10 hidden group-hover:block' style={{textDecoration:'underline'}}>
                  <p className='text-[13px] cursor-pointer ' onClick={logout}>Sign Out of Netflix</p>
                </div>
            </div>
        </div>
    </header>
  )
}
