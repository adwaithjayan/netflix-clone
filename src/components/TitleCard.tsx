import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

export default function TitleCard({title,category}:{title?:string,category?:string}) {
  const [movieData,setMovieData]=useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzczMTY4N2M4ZWM2N2VjZTY5OThiMTlmYmNjMWQzYSIsIm5iZiI6MTcyMzc0MTg0OC40ODM5NjMsInN1YiI6IjY2NjA5ZWQ3ZDk1NmM2N2FhNzAwODBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FY6xb_IEjILorgRXYE8q9OAxeW24eeBiPCwidgBraIk'
    }
  };
  

  useEffect(()=>{

    
      fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setMovieData(response.results))
      .catch(err => console.error(err));

      

  
  })
  return (
    <div className="mt-[50px] mb-[30px]">
      <h2 className="mb-2 font-bold">{title? title:'Popular on Netflix'}</h2>
      <div className="flex gap-2.5 overflow-x-scroll">
        {movieData.map((card,i) => {
          return (
            <Link to={`/player/${card?.id}`} key={i} className="min-w-fit relative">
              <img src={`https://image.tmdb.org/t/p/w500${card?.backdrop_path}`} alt="card" className="w-[240px] rounded cursor-pointer"/>
              <p className="absolute bottom-2.5 right-2.5 text-[#e5e5e5]">{card?.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
