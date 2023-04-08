import { Movie } from "../intefaces/Movie.model";
import { MovieCardComponent } from "./MovieCard.component";

export function MovieListComponent({children}: {children: Movie[]}) {
  return (!!children.length
    ? <ul className="movies">{children.map(movie => <MovieCardComponent key={movie.id} movie={movie} />)}</ul>
    : <h3>No se encontraron resultados</h3>
  )
}