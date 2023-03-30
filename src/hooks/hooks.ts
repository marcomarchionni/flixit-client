import { useSelector } from 'react-redux';
import { User } from '../interfaces/interfaces';
import { useAppDispatch } from '../redux/hooks';
import { selectToken, setToken } from '../redux/reducers/token';
import { selectUser, setUser } from '../redux/reducers/user';
import { buildFavouriteUrl } from '../utils/urls';

export const useToggleFavourite = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useAppDispatch();

  const toggleFavourite = (movieId: string) => {
    if (!user || !token || !movieId) {
      return; // TODO throw error
    }
    const favoriteUrl = buildFavouriteUrl(user.username, movieId);
    const movieIsFavourite = user.favouriteMovies.includes(movieId);
    const httpMethod = movieIsFavourite ? 'DELETE' : 'PUT';

    fetch(favoriteUrl, {
      method: httpMethod,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser: User) => {
        dispatch(setUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((err: Error) => console.error(err));
  };

  return toggleFavourite;
};

export const useHandleLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(''));
    localStorage.clear();
  };

  return handleLogout;
};
