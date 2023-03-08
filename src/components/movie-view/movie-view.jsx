import PropTypes from 'prop-types';

const MovieView = ({ movie }) => {
  const stars = movie.stars.map((star) => star.name).join(', ');
  return (
    <div>
      <div>
        <img src={movie.imageUrl} alt="poster"></img>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Stars: </span>
        <span>{stars}</span>
      </div>
      <div>
        <span>Description: </span>
        {movie.description}
      </div>
      <div>
        <span>Genre: </span>
        {movie.genre.name}
      </div>
      <div>
        <span>Year: </span>
        {movie.year}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    description: PropTypes.string,
    stars: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    year: PropTypes.string,
  }).isRequired,
};

export default MovieView;
