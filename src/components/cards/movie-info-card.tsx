import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useToggleFavourite } from '../../hooks/use-toggle-favourite';
import { Movie } from '../../types/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/reducers/user';
import { StarButton } from '../buttons/buttons';
import { getImageUrls, getResizedImageUrls } from '../../utils/urls';
import CardCarousel from '../card-carousel/card-carousel';
import Loading from '../loading/loading';
import { Navigate } from 'react-router';

const MovieInfoCard = ({
  movie,
  isLoading,
}: {
  movie: Movie | null;
  isLoading: boolean;
}) => {
  const user = useAppSelector(selectUser);
  const toggleFavourite = useToggleFavourite();

  if (isLoading) {
    return <Loading />;
  }
  if (!movie) {
    return <Navigate to="/" />;
  }
  const isFavorite = user ? user.favouriteMovies.includes(movie._id) : false;
  const stars = movie.stars.map((star) => star.name).join(', ');
  const imageUrls = getImageUrls(movie);
  const resizedImageUrls = getResizedImageUrls(movie);

  return (
    <Card className="w-100">
      <CardCarousel imageUrls={imageUrls} resizedImageUrls={resizedImageUrls} />
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
                  <th>Original Title</th>
                  <td>{movie.originalTitle}</td>
                </tr>
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
  );
};

export default MovieInfoCard;
