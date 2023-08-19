import { buildMovieByIdUrl } from '../utils/urls';

export const fetchMovieById = (movieId: string, token: string) => {
  const movieByIdUrl = buildMovieByIdUrl(movieId);
  return fetch(movieByIdUrl, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      throw err; // Throw error further so it can be caught in the component
    });
};
