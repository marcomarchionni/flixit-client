import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';

interface MovieCardProps {
  movie: Movie;
  onCardClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MovieCard = ({ movie, onCardClick }: MovieCardProps) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://placehold.co/100x180" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button onClick={onCardClick} variant="link">
          View Info
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
