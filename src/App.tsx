import './App.css'
import { createRef, FormEvent, useEffect, useRef, useState } from 'react';
import { MovieListComponent } from './components/MovieList.component';
import { TitleComponent } from './components/Title.component';
import React from 'react';
import { useMovies } from './hooks/useMovies';
import { LoadingSpinnerComponent } from './components/LoadingSpinner.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { useFirstRender } from './hooks/useFirstRender';

function App() {
  const [sort, setSort] = useState(false)
  const {movies, getMovies, loading} = useMovies({sort})
  const {firstRender} = useFirstRender();
  const inputRef: React.RefObject<HTMLInputElement> = createRef();
  const onSearchRef = useRef<Subject<string>>(new Subject());
  const onSearch$ = onSearchRef.current;

  useEffect(() => {
    onSearch$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(getMovies)
  }, [])

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    onSearch$.next(inputRef.current!.value)
  }

  const handleSort = () => setSort(!sort)

  return (
    <div className="page">
      <header>
        <TitleComponent title="film finder 🎞️🎬🎥"/>
        <form className="form">
          <input onChange={handleChange} ref={inputRef}/>
          <input type="checkbox" onChange={handleSort} checked={sort}/>
        </form>
      </header>

      <main> {loading
        ? <LoadingSpinnerComponent />
        : !firstRender && <MovieListComponent>{movies}</MovieListComponent>}
      </main>
    </div>
  )
}

export default App
