import { useAppDispatch } from '../redux/hooks';
import { setToken } from '../redux/reducers/token';
import { setUser } from '../redux/reducers/user';

export const useHandleLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(''));
    localStorage.clear();
  };

  return handleLogout;
};
