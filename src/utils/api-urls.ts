const API_BASE_URL = 'https://itflix-api.herokuapp.com';

export const MOVIES_URL = API_BASE_URL + '/movies';

export const USERS_URL = API_BASE_URL + '/users';

export const composeLoginUrl = (username: string, password: string) => {
  return `${API_BASE_URL}/login?username=${username}&password=${password}`;
};
