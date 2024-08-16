import { useEffect, useState } from 'react';
import back_arrow from '../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';
export default function Player() {
  const navigate =useNavigate();
  const apikey=import.meta.env.VITE_MOVIEDB_KEY;
const url =import.meta.env.VITE_MOVIEDB_URL;


const [videoData,setVideoData]=useState({
  name:'',
  key:'',
  published_at:'',
  typeof:""
})
const {id } =useParams();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apikey}`,
    }
  };
  useEffect(()=>{
    
  fetch(`${url}movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response => setVideoData(response.results[0]))
  .catch(err => console.error(err));

  },[])


  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <img onClick={()=>navigate(-2)} className='absolute top-5 left-5 w-[50px] cursor-pointer' src={back_arrow} alt="backarrow" />
      <iframe className='rounded-[10px]' width='90%' height='90%' src={`https://www.youtube.com/embed/${videoData.key}`} title='trailer' frameBorder={0} allowFullScreen></iframe>
      <div className='flex items-center justify-between w-[90%]'>
        <p>{videoData.published_at.slice(0,10)}</p>
        <p>{videoData.name}</p>
        <p>{videoData.typeof}</p>
      </div>
    </div>
  )
}
