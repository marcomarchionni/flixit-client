export const findRelatedMovies = (allMovies, selectedMovie) => {
    return allMovies.filter(
        (movie) => { 
            return (
                ( sameDirector(movie, selectedMovie) || sameGenre(movie, selectedMovie)) 
                && differentTitle(movie, selectedMovie)
            )
        }
    )
}

const differentTitle = (movieOne, movieTwo) => {
    return movieOne.title !== movieTwo.title;
}

const sameDirector = (movieOne, movieTwo) => {
    return movieOne.director.name === movieTwo.director.name;
}

const sameGenre = (movieOne, movieTwo) => {
    return movieOne.genre.name === movieTwo.genre.name;
}