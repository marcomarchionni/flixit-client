import { useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView  from '../movie-view/movie-view';

const MainView = () => {

    const [ movies, setMovies ] = useState([
        {   _id: "63ed4f818e058a92de1d4552", 
            title: "Il Sorpasso", 
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/58/Il_sorpasso.jpg", 
            genre: "Commedia all'Italiana", 
            director: "Dino Risi", 
            stars: ["Vittorio Gassman", "Catherine Spaak"],
            description: "An impulsive braggart takes a shy law student with him for a two-day road trip from Rome to Tuscany."
        },
        {   _id: "63ed50a98e058a92de1d4553", 
            title: "L'Armata Brancaleone", 
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/43/Armata_Brancaleone.jpg", 
            genre: "Commedia all'Italiana", 
            director: "Mario Monicelli", 
            stars: ["Vittorio Gassman", "Catherine Spaak"],
            description: "A group of misfits, headed by an incompetent knight named Brancaleone, set out to reach the small town of Aurocastro so that their leader can take possession of the fief."
         },
        {   _id: "63ed4c0e8e058a92de1d454f", 
            title: "Django", 
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/61/Djangofilm.jpg", 
            genre: "Spaghetti Western", 
            director: "Sergio Corbucci", 
            stars: ["Franco Nero"], 
            description: "The film follows a Union soldier-turned-drifter and his companion, a mixed-race prostitute, who become embroiled in a bitter, destructive feud between a gang of Confederate Red Shirts and a band of Mexican revolutionaries."
        }
    ]);

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