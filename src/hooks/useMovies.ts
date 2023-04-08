import { useCallback, useEffect, useMemo, useState } from "react"
import { OmdbAPI } from "../adapters/OmdbAPI.adapter"
import { Movie } from "../intefaces/Movie.model"
import * as _ from "lodash";

export const useMovies = ({sort}: {sort: boolean}) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false);

  const getMovies = useCallback((searchTerm: string) => {
    setLoading(true);
    OmdbAPI.getMoviesByTitle(searchTerm).subscribe(
      moviesFound => {
        setLoading(false);
        setMovies(moviesFound)
      }
    )
  }, [])

  const sortedMovies = useMemo<Movie[]>( // no-sense in this case
    () => sort ? _.sortBy(movies, (movie) => Number(movie.year)) : movies, [sort, movies]
  )

  return {
    movies: sortedMovies,
    getMovies,
    loading
  }
}