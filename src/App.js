
import './App.css';
import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import { Navbar } from './components/Navbar';
import { MovieDetail } from './components/MovieDetail';

const APIKEY ='bf4f0ee3';
const APIURL = 'https://www.omdbapi.com';

const fetchMovies = async (search = 'The godfather') => {
  if (search.length < 3) {
    return;
  }
  const response = await fetch(APIURL + '?apikey=' + APIKEY + '&s=' + search).then(res => res.json());
  const { Error, Search: movies, totalResults: totalCount } = response;
  
  return { movies, totalCount, Error: Error ?? '' };
}

const fetchMoviesById = async (movieId) => {
  const response = await fetch(APIURL + '?apikey=' + APIKEY + '&i=' + movieId).then(res => res.json());
  const { Error, Search: movies, totalResults: totalCount } = response;
  
  return response;
}


function App() {
     
  const [movies, setMovies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const selectMovie = async (movie) =>{
    setSelectedMovie(movie);
    const newMovie = await fetchMoviesById(movie.imdbID);
    setSelectedMovie(newMovie);
  };

  const callApi = async (search = '') => {

    const data = await fetchMovies(search);
    console.log(data)
   setError(data.Error);
   
   if (!data.Error.length) {
     setMovies(data.movies);
     setSelectedMovie(data.movies[0])
     setTotalCount(data.totalCount);
   } else {
     setTotalCount(0);
     setMovies([]);
   }
    }
  useEffect(() => {
   
    callApi('Godfather');
    return () => {
     
    }
  }, []);

  return (
    <>
      <Navbar onSearchChange={callApi }/>
    <div className="App container-fluid">
      <header className="App-header">
        <h1> MY FAVORITE MOVIES ({totalCount})</h1>
      
        </header>
        {
          !error ? <MovieList onSelectedMovie={selectMovie} movies={movies} /> : <h2>{ error}</h2>
        } 
        <MovieDetail movie={selectedMovie}/>
      </div>
      </>
  );
}

export default App;