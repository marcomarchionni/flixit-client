import React from 'react';
import { Movie } from '../../interfaces/interfaces';

interface MovieViewProps {
  movie: Movie;
}

const MovieView = ({ movie }: MovieViewProps) => {
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

export default MovieView;
