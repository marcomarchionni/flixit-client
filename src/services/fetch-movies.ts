import { MOVIES_URL } from '../utils/urls';

export function fetchMovies(token) {
  return fetch(MOVIES_URL, { headers: { Authorization: `Bearer ${token}` } })
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
}
