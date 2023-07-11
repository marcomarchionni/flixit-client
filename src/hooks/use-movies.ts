import { useEffect } from 'react';
import { Movie } from '../interfaces/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoading } from '../redux/reducers/loading';
import { setMovies } from '../redux/reducers/movies';
import { selectToken } from '../redux/reducers/token';
import { fetchMovies } from '../services/fetch-movies';
import { useHandleLogout } from './use-handle-logout';

export const useMovies = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const handleLogout = useHandleLogout();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true));
    fetchMovies(token)
      .then((movieData: Movie[]) => {
        dispatch(setMovies(movieData));
        dispatch(setLoading(false));
      })
      .catch((err: Error) => {
        if (err.message === 'Unauthorized') {
          handleLogout();
        } else {
          // Handle other errors as necessary
          console.error(err);
        }
      });
  }, [token]);
};
