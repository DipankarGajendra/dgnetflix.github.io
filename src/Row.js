import axios from "./axios";
import React, { useEffect, useState } from 'react'
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({title, fetchUrl, isLargeRow = false}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

  useEffect(() => {
    async function fetchData () {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;

    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  const handleClick = (movie) => {
    
   if(trailerUrl){
      setTrailerUrl("");
      }
      
    else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log("Param", urlParams.get("v"))

      }).catch((error) => console.log("Not available"));


    }
 
  };
 
 
 const opts = {
  height : "390",
  width : "100%",
  playerVar : {
    autoplay :1,
  },
 };
 
  
  return (
    <div className="row">
    <h2>{title}</h2>
       <div className="row__posters">
    
        {movies && movies.map((movie) => (
          
      
          
          <img
             key={movie.id}
             className={`row__poster ${isLargeRow && "row__posterLarge"}`}
             onClick={() => handleClick(movie)}
            
             src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
              
         
           ))}
              
       </div>
          
          {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts}/>}
    </div>
  );
}

export default Row;