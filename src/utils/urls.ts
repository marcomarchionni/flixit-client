import imagePlaceholder from '../assets/movie-photo-placeholder.png';
import thumbnailPlaceholder from '../assets/movie-thumbnail-placeholder.png';
import { Movie } from '../types/interfaces';

const API_BASE_URL = process.env.NODE_ENV_BACKEND_URL;

export const MOVIES_URL = API_BASE_URL + '/movies';

export const USERS_URL = API_BASE_URL + '/users';

export const buildMovieByIdUrl = (movieId: string) =>
  `${MOVIES_URL}/id/${movieId}`;

export const buildLoginUrl = (username: string, password: string) => {
  return `${API_BASE_URL}/login?username=${username}&password=${password}`;
};

export const buildFavouriteUrl = (username: string, movieId: string) => {
  return `${USERS_URL}/${username}/movies/${movieId}`;
};

export const buildUserProfileUrl = (username: string) => {
  return `${USERS_URL}/${username}`;
};

export const getImageUrls = (movie: Movie) => {
  const { imageUrls } = movie;
  if (imageUrls && imageUrls.length > 0) {
    return imageUrls;
  }
  return [imagePlaceholder];
};

export const getResizedImageUrls = (movie: Movie) => {
  const { resizedImageUrls } = movie;
  if (resizedImageUrls && resizedImageUrls.length > 0) {
    return resizedImageUrls;
  }
  return [thumbnailPlaceholder];
};
