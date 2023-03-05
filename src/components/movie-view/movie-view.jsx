const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <div><img src={movie.imageUrl} alt="poster"></img></div>
                <div><span>Title: </span><span>{movie.title}</span></div>
                <div><span>Director: </span><span>{movie.director}</span></div>
                <div><span>Stars: </span><span>{movie.stars.join(', ')}</span></div>
                <div><span>Description: </span>{movie.description}</div>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}

export default MovieView;