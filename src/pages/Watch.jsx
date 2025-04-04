import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { NavigationBar } from "../components";

const Watch = (props) => {
    const {type, id} = useParams();
    const [result, setResult] = useState("");
    const [genres, setGenres] = useState([]);
    const iframeRef = useRef();

    // call use effect
    useEffect(() => {
        


        // fetch movie details
        fetch(`${props.tmdb.baseUrl}/${type}/${id}`, {
            headers: {
                "Authorization" : `Bearer ${props.tmdb.readAccessToken}`,
                "Accept": "application/json",
            }
        })
        .then(response => response.json())
        .then(response => {
            setResult(response);

            const g = [];

            // update genres
            response.genres.map(genre => {
                g.push(genre.name);
            });
            
            setGenres([...g]);
        })
        .catch(err => console.log(err));
    }, []);

    // handle video load
    const handleIframeLoad = e => {
        console.log(e.target);
    }

    return (
        <>
            <NavigationBar />

            <div className="w-full bg-cover bg-no-repeat bg-center text-white" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${result.backdrop_path})`}}>
                <div className="w-full bg-[rgba(0,0,0,0.4)]">
                    <div className="container max-w-7xl mx-auto  p-10">
                        <iframe allowFullScreen ref = {iframeRef} onLoad={e => handleIframeLoad(e)} className="w-full" style={{aspectRatio: "16/9"}} src={ `https://embed.7xtream.com/4k/${type}/${id}`}></iframe>  
                    </div>
                </div>
            </div>

            <div className="w-full text-white">
                <div className="container max-w-7xl mx-auto p-10">
                    <div className="grid gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt="" />
                        </div>

                        <div className="flex flex-col gap-8">
                            <h1 className="font-bold text-lg">{result.title ? result.title : result.name}</h1>

                            <div className="flex gap-8 align-middle items-center">
                                <span><i className="fa fa-star text-yellow-600"></i> {result.vote_average?.toFixed(1)}</span>
                                <span><i className="text-[8px] fa fa-circle"></i></span>
                                <span>{ result.runtime ? `${result.runtime} Min` : `${result.number_of_seasons} Season(s)` } </span>
                                <span><i className="text-[8px] fa fa-circle"></i></span>
                                <span>{result.release_date ? result.release_date?.substring(0,4) : result.first_air_date?.substring(0,4) }</span>
                            </div>

                            <div className="">
                               <p> <span className="font-bold text-slate-500">Genres:</span> { genres.join(", ") }</p>
                            </div>
                            
                            <div>
                                <p>{ result.overview }</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Watch;
