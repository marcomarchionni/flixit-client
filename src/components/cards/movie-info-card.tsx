import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/reducers/user';
import { useToggleFavourite } from '../../hooks/hooks';
import { StarButton } from '../ui/buttons';

const MovieInfoCard = ({ movie }: { movie: Movie }) => {
  const user = useAppSelector(selectUser);
  const toggleFavourite = useToggleFavourite();
  const isFavorite = user ? user.favouriteMovies.includes(movie._id) : false;
  const stars = movie.stars.map((star) => star.name).join(', ');

  return (
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
