import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';

const MainView = () => {

    const [ movies, setMovies ] = useState([]);

    useEffect(()=> {
        fetch("https://itflix-staging.herokuapp.com/movies")
        .then((response) => response.json())
        .then((movieData) => {
            setMovies(movieData)
        })
        .catch(err=>console.error(err))
    },[]);

    const [ selectedMovie, setSelectedMovie ] = useState(null);

    if (selectedMovie) {
        return (
        <MovieView key={selectedMovie._id} movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)}/>
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