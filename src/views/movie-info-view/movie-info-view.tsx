import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { StarButton } from '../../components/layout/buttons';
import MainWrapper from '../../components/layout/main-wrapper';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { useAppSelector } from '../../redux/hooks';
import { selectMovies } from '../../redux/reducers/movies';
import { selectUser } from '../../redux/reducers/user';
import { useToggleFavourite } from '../../utils/hooks';
import { getRelatedMovies } from '../../utils/related-movies';

type MovieInfoParams = {
  movieId: string;
};

const MovieInfoView = () => {
  const { movieId } = useParams<MovieInfoParams>();
  const user = useAppSelector(selectUser);
  if (!user) return <Navigate to="/login" />;

  const movies = useAppSelector(selectMovies);
  const movie = movies.find((m) => m._id === movieId); //useEffect??
  if (!movieId || !movie) {
    return <Navigate to="/" />;
  }
  const stars = movie.stars.map((star) => star.name).join(', ');
  const relatedMovies = getRelatedMovies(movies, movie);
  const toggleFavourite = useToggleFavourite();
  const isFavorite = user.favouriteMovies.includes(movieId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <MainWrapper>
      <Row className="g-2">
        <Col lg={9} sm={8}>
          <Row className="bg-white rounded-4 m-2 p-2 border border-secondary">
            <Col lg={6} className="p-2">
              <Image fluid src={movie.imageUrl} className="w-100" />
            </Col>
            <Col lg={6} className="d-flex flex-column p-4">
              <h3 className="mt-2 mb-4 text-center">{movie.title}</h3>
              <div className="d-flex justify-content-center">
                <Table borderless>
                  <tbody>
                    <tr>
                      <th>Director</th>
                      <td>{movie.director.name}</td>
                    </tr>
                    <tr>
                      <th>Stars</th>
                      <td>{stars}</td>
                    </tr>
                    <tr>
                      <th>Genre</th>
                      <td>{movie.genre.name}</td>
                    </tr>
                    <tr>
                      <th>Year</th>
                      <td>{movie.year}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="flex-grow-1">{movie.description}</div>
              <div className="d-flex justify-content-center">
                <StarButton
                  handleToggle={() => toggleFavourite(movie._id)}
                  isOn={isFavorite}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} sm={4}>
          <Row className="px-2">
            <Col>
              <MovieGrid
                items={relatedMovies}
                isLoading={false}
                noItemsAlert={'NoRelatedMovies'}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainWrapper>
  );
};

export default MovieInfoView;
