import PropTypes from 'prop-types';

const MovieCard = ({movie, onCardClick}) => {
    return (
    <div>
        <div onClick={onCardClick}
        >{movie.title}</div>
    </div>)
}

MovieCard.propTypes = {
    movie: PropTypes.shape ({
        title: PropTypes.string.isRequired
    }).isRequired,
    onCardClick: PropTypes.func.isRequired
}

export default MovieCard;