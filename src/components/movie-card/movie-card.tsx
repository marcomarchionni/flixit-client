import React from 'react';
import { Card } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/reducers/user';
import { InfoButton, StarButton } from '../layout/buttons';

interface MovieCardProps {
  movie: Movie;
  toggleFavourite: (id: string) => void;
}

const MovieCard = ({ movie, toggleFavourite }: MovieCardProps) => {
  const user = useAppSelector(selectUser);
  const isFavourite = user ? user.favouriteMovies.includes(movie._id) : false;
  return (
    <Card className="h-100" style={{ width: '15rem' }}>
      <Card.Img variant="top" src={movie.imageUrl} width="50" />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1 d-flex align-items-center text-center">
          <Card.Title className="flex-grow-1 fi-card-title-font-size">
            {movie.title.toUpperCase()}
          </Card.Title>
        </div>
        <div className="d-flex justify-content-center m-2">
          <StarButton
            toggleFavouriteCallback={() => {
              toggleFavourite(movie._id);
            }}
            isFavourite={isFavourite}
          />
          <InfoButton goToLink={`/movies/${movie._id}`} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
