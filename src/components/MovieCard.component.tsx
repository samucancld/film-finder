import React from "react";
import { Movie } from "../intefaces/Movie.model";

export function MovieCardComponent({movie}: {movie: Movie}) {
  return (
    <React.Fragment>
      <li>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.poster} alt={movie.title} />
      </li>
    </React.Fragment>
  )
}