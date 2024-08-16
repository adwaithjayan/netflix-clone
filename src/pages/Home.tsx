import Navbar from "../components/Navbar";
import hero_title from '../assets/hero_title.png'
import playIcon from '../assets/play_icon.png'
import infoIcon from '../assets/info_icon.png'
import TitleCard from "../components/TitleCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
export default function Home() {
  const apikey=import.meta.env.VITE_MOVIEDB_KEY;
const url =import.meta.env.VITE_MOVIEDB_URL;
  
  const [movieData,setMovieData]=useState([]);


  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apikey}`,
    }
  };

  useEffect(()=>{
    featuredcall();
      
  },[])
  const featuredcall= async ()=>{
    try{
      const res =await fetch(`${url}popular?language=en-US&page=1`, options)
      const result = await res.json()
      const num = Math.floor(Math.random() * 20);
      const data = result.results[num];
      if (data && data.backdrop_path && data.overview) {
        setMovieData(data);
      } else {
        console.error("Invalid movie data");
      }
    }
    catch(err){console.log(err);}
    
  }
const [backdrop_path, overview ] = movieData;
  return (
    <>
        <Navbar/>
        <div className="relative ">
          <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="banner" className="w-full h-screen [mask-image:linear-gradient(to_right,transparent,black_75%)]"/>
          <div className="absolute w-full pl-[6%] bottom-0 mlg:hidden ">
            <img src={hero_title} alt="hero-title" className="w-[90%] max-w-[420px] mb-[30px]" />
            <p className="text-[17px] max-w-[700px] mb-5">{overview?.slice(0, 200)}</p>
              <div className="flex gap-2.5 mb-[50px] mlg:mb-[30px]">
                <button className="btn">
                  <img src={playIcon} alt="icon" className="w-[25px]"/>
                  Play
                </button>
                <button className="btn btn-dark">
                  <img src={infoIcon} alt="more" className="w-[25px]"/>
                  More Info
                </button>
              </div>
            <TitleCard />

          </div>
        </div>
        <div className="pl-[6%]"> 
          <TitleCard title="Blockbuster Movire" category="top_rated"/>
          <TitleCard title="Only on Netflix" category="popular"/>
          <TitleCard title="Upcoming" category="upcoming"/>
          <TitleCard title="Top Pics for You" category="now_playing"/>
            
        </div>
        <Footer/>
    </>
  )
}
