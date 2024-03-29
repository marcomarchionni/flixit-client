const API_BASE_URL = process.env.NODE_ENV_BACKEND_URL;

export const MOVIES_URL = API_BASE_URL + '/movies';

export const USERS_URL = API_BASE_URL + '/users';

export const buildLoginUrl = (username: string, password: string) => {
  return `${API_BASE_URL}/login?username=${username}&password=${password}`;
};

export const buildFavouriteUrl = (username: string, movieId: string) => {
  return `${USERS_URL}/${username}/movies/${movieId}`;
};

export const buildUserProfileUrl = (username: string) => {
  return `${USERS_URL}/${username}`;
};
