const MovieCard = ({movie, onCardClick}) => {
    return (
    <div>
        <div onClick={onCardClick}
        >{movie.title}</div>
    </div>)
}

export default MovieCard;