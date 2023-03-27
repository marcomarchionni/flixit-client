import React, { useEffect } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { StarButton } from '../../components/layout/buttons';
import MainLayout from '../../components/layout/main-layout';
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
    <MainLayout>
      <Row className="g-2 my-4">
        <Col lg={9} sm={8}>
          <Card>
            <Card.Img variant="top" src={movie.photoUrl} alt="movie photo" />
            <Card.Body className="px-5 px-4">
              <Card.Title as="h2" className="text-center my-3">
                {movie.title}
              </Card.Title>
              <div className="d-flex justify-content-center">
                <StarButton
                  handleToggle={() => toggleFavourite(movie._id)}
                  isOn={isFavorite}
                />
              </div>
              <Row className="m-4">
                <Col>
                  <Table borderless size="sm">
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
                </Col>
                <Col>
                  <Card.Text className="p-1">{movie.description}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
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
    </MainLayout>
  );
};

export default MovieInfoView;
