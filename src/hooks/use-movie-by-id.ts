import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectToken } from '../redux/reducers/token';
import { Movie } from '../types/interfaces';
import { useHandleLogout } from './use-handle-logout';
import { fetchMovieById } from '../services/fetch-movie-by-id';

export const useMovieById = (movieId: string) => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const handleLogout = useHandleLogout();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    setIsLoading(true);
    fetchMovieById(movieId, token)
      .then((movie: Movie) => {
        setMovie(movie);
        console.log({ movie });
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (err.message === 'Unauthorized') {
          handleLogout();
        } else {
          // Handle other errors as necessary
          console.error(err);
        }
        setIsLoading(false);
      });
  }, [token, movieId]);

  return { movie, isLoading };
};
