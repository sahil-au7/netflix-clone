import React, { useState, useEffect } from "react";
import axios from "../Utilities/axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const base_url_image = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = axios.get(fetchUrl);
      setMovies((await response).data.results);
      return response;
    };

    fetchData();
  }, [fetchUrl]);

  const setMovieTrailerUrl = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.table(movie);
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.table(error);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => setMovieTrailerUrl(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url_image}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
