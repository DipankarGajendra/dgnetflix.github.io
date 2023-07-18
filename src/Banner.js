import React, { useState, useEffect} from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";


function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => 
    {
        async function fetchData() {
            const request = await axios.get(requests.fetchHorrorMovies);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length ) 
            ]

            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(string, n){
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

  return (
    <header className="banner"
    style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://www.themoviedb.org/t/p/w600_and_h600_bestv2/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",

    }}>
     <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner__buttons">
            
            <button className="banner__button__play"  >Play</button>
            <button className="banner__button__moreinfo">More Info</button>

        </div>
       <h1 className='banner__description'>
        {truncate(`${movie?.overview} `, 150)}
       </h1> 
     </div>

     <div className='banner--fadeBottom'/>
    
    </header>

  )
}

export default Banner;