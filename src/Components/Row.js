import React, { useState, useEffect } from "react";
import axios from "../Utilities/axios";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const base_url_image = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      const response = axios.get(fetchUrl);
      setMovies((await response).data.results);
      return response;
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      {console.log(movies)}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url_image}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
