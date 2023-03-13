import React from 'react'
import { Movie } from '../../interfaces/interfaces';

const MovieCard: React.FC<{ movie: Movie, onCardClick: React.MouseEventHandler<HTMLDivElement> }> = ({movie, onCardClick}) => {
    return (
      <div>
        <div onClick={onCardClick}>{movie.title}</div>
      </div>
    );
  };

export default MovieCard;
