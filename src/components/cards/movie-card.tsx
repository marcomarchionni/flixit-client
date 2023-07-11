import React from 'react';
import { Card } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/reducers/user';
import { useToggleFavourite } from '../../hooks/use-toggle-favourite';
import { InfoButton, StarButton } from '../buttons/buttons';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const user = useAppSelector(selectUser);
  const isFavourite = user ? user.favouriteMovies.includes(movie._id) : false;
  const toggleFavourite = useToggleFavourite();
  return (
    <Card className="h-100" style={{ width: '15rem' }}>
      <Card.Img variant="top" src={movie.posterUrl} width="50" />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1 d-flex align-items-center text-center">
          <Card.Title as="h4" className="flex-grow-1">
            {movie.title.toUpperCase()}
          </Card.Title>
        </div>
        <div className="d-flex justify-content-center m-2">
          <StarButton
            handleToggle={() => {
              toggleFavourite(movie._id);
            }}
            isOn={isFavourite}
          />
          <InfoButton goToLink={`/movies/${movie._id}`} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
