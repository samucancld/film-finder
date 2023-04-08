import axios, { AxiosResponse } from "axios";
import { catchError, from, map, Observable, of } from "rxjs";
import { OMDB_TYPE } from "../enums/OMDB_TYPE.enum";
import { Movie } from "../intefaces/Movie.model";
import { RawMovie } from "../intefaces/RawMovie.model";

export class OmdbAPI {
  constructor() {}
  static apiKey = '14d5b147';
  static dataUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  static adaptMovie(movie: RawMovie): Movie {
    return ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type as OMDB_TYPE,
      id: movie.imdbID,
    })
  }
  static adaptMovies = () => map((movies: RawMovie[]) => movies.map(movie => this.adaptMovie(movie)));
  static checkEmptyness = () => map((response: AxiosResponse<any, any>) => {
    if (response.data.Response === "False") return [];
    return response.data.Search as RawMovie[];
  })

  static getMoviesByTitle(title: string): Observable<Movie[]> {
    if (!title) {return of([])}
    const movies$: Observable<Movie[]> = from(
      axios.get(`${this.dataUrl}&s=${title}`)
    ).pipe(
        this.checkEmptyness(),
        this.adaptMovies(),
        catchError(error => {throw "Esto es un error: " + error})
      );
    return movies$
  }
}
