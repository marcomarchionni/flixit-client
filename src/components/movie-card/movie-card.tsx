import React from 'react';
import { Card } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { InfoButton, StarButton } from '../basic-components/buttons';

interface MovieCardProps {
  movie: Movie;
  isFavourite: boolean;
  toggleFavourite: (id: string) => void;
}

const MovieCard = ({ movie, isFavourite, toggleFavourite }: MovieCardProps) => {
  console.log(isFavourite);
  return (
    <Card className="h-100 border border-secondary rounded-4">
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1 d-flex align-items-center text-center">
          <Card.Title className="flex-grow-1 fi-card-title-font-size">
            {movie.title.toUpperCase()}
          </Card.Title>
        </div>
        <div className="d-flex justify-content-center m-2">
          <StarButton
            toggleFavourite={() => {
              console.log('Toggle Fav:' + movie._id);
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
