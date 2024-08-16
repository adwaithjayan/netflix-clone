import yt from '../assets/youtube_icon.png'
import x from '../assets/twitter_icon.png'
import inst from '../assets/instagram_icon.png'
import fb from '../assets/facebook_icon.png'
export default function Footer() {
  return (
    <footer className='py-[30px] px-[4%] max-w-[1000px] mx-auto my-0'> 
      <div className='flex gap-5 mx-0 my-10'>
        <img src={fb} alt="yt"  className='w-[30px] cursor-pointer'/>

        <img src={x} alt="yt"  className='w-[30px] cursor-pointer'/>
        <img src={inst} alt="yt"  className='w-[30px] cursor-pointer'/>
        <img src={yt} alt="yt"  className='w-[30px] cursor-pointer'/>

      </div>
      <ul className='grid grid-cols-[auto_auto_auto_auto] gap-[15px] mb-[30px]'>
     <li>Audio Description</li>
      <li>He1p Centre</li>
      <li>Gift Cards</li>
      <li>Media Centre</li>
      <li>lnvestor Relations</li>
      <li>Jobs</li>
      <li>Terms of Notices</li>
      <li>Cookie Preferences</li>
      <li>Corporate Information</li>
      <li>Contact Us</li>
      </ul>
      <p className='text-gray-600'>© 1996-2022 Netflix, Inc.</p>
    </footer>
  )
}
