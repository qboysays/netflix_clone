import React, {useState,useEffect} from 'react'
import axios from './axios'
import './Row.css'
import YouTube from "react-youtube";
const movieTrailer = require( 'movie-trailer' ) 


const base_url="https://image.tmdb.org/t/p/original/"

function Row({title,fetchUrl,isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{

        async function fetchData(){
            const request=await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();

    },[fetchUrl]);

    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    }

    var randomTrailers=[
        "-0beFQnB5lY",
        "rq9MHCwiSCI",
        "wjJq4Hy8FxM",
        "8ctRjR_DWAg",
        "sPoTMwOftuA",
        "xCwwxNbtK6Y",
        "QsacpJwXCO8"
    ]

    const handleClick=(movie)=>{
        console.log(movie);
        if (trailerUrl) {
            setTrailerUrl('');
                       
        }else{
            movieTrailer(movie?.name||"")
            .then((url) =>{
                url=url?url:setTrailerUrl( randomTrailers[Math.floor(Math.random()*randomTrailers.length-1)]);
                const urlParams=new URLSearchParams( new URL(url).search);
                setTrailerUrl( urlParams.get('v'));
                

            })
            .catch((error)=>console.log(error));
        }

    }



    return (
        
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">

                
                {movies.map(movie=>(<img 
                key={movie.id}
                onClick={()=>handleClick(movie)}
                className={`row_poster  ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                alt={movie.name}
                />))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }

        </div>
    )
}

export default Row
