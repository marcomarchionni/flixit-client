import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { InfoLg, Star } from 'react-bootstrap-icons';
import { Movie } from '../../interfaces/interfaces';

interface MovieCardProps {
  movie: Movie;
  onInfoClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MovieCard = ({ movie, onInfoClick }: MovieCardProps) => {
  return (
    <Card className="h-100 border border-secondary rounded-4">
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-grow-1 d-flex align-items-center text-center">
          <Card.Title className="flex-grow-1">{movie.title}</Card.Title>
        </div>
        <div className="d-flex  justify-content-center m-2">
          <Button variant="outline-secondary" size="sm" className="mx-1">
            <Star className="bi" />
          </Button>
          <Button
            onClick={onInfoClick}
            variant="outline-secondary"
            size="sm"
            className="mx-1"
          >
            <InfoLg className="bi" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
