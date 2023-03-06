import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';
import { findRelatedMovies } from '../../utils/utils';

const MainView = () => {

    const [ movies, setMovies ] = useState([]);
    const [ selectedMovie, setSelectedMovie ] = useState(null);

    useEffect(()=> {
        fetch("https://itflix-staging.herokuapp.com/movies")
        .then((response) => response.json())
        .then((movieData) => {
            setMovies(movieData)
        })
        .catch(err=>console.error(err))
    },[]);

    if (selectedMovie) {
        const relatedMovies = findRelatedMovies(movies, selectedMovie);
        return (
        <div>
            <MovieView key={selectedMovie._id} movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)}/>
            <br />
            <h2>Related Movies</h2>
            {relatedMovies.map( movie => (
                <MovieCard key={movie._id} movie={movie} onCardClick={()=>setSelectedMovie(movie)}/>
                )
            )            }
        </div>
        )
    }

    if (movies.length === 0) {
        return <div>No movie available</div>
    }

    return (
        <div>
            {movies.map( movie => (
                <MovieCard key={movie._id} movie={movie} onCardClick={()=>setSelectedMovie(movie)}/>
            ))}
        </div>
    )
}

export default MainView;

