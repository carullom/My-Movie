import MovieItem from "./MovieItem";

const MovieList = ({movies, onSelectedMovie}) =>{

    return(
        <div className='row d-flex justify-content-center'>
          {
          movies.map(movie => <MovieItem onSelectedMovie={onSelectedMovie} key= {movie.imdbID} movie ={movie}/>)
          }
        </div>
    );
}

export default MovieList;