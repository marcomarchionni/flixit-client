import React from 'react';
import { Movie } from '../../interfaces/interfaces';

interface MovieCardProps {
  movie: Movie;
  onCardClick: React.MouseEventHandler<HTMLDivElement>;
}

const MovieCard = ({ movie, onCardClick }: MovieCardProps) => {
  return (
    <div>
      <div onClick={onCardClick}>{movie.title}</div>
    </div>
  );
};

export default MovieCard;
