import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons';
import Image from 'react-bootstrap/Image';
import { Movie } from '../../interfaces/interfaces';
import RelatedMovies from '../related-movies/related-movies';

interface MovieViewProps {
  movie: Movie;
  movies: Movie[];
  showMovieInfo: Function;
}

const MovieInfo = ({ movie, movies, showMovieInfo }: MovieViewProps) => {
  const stars = movie.stars.map((star) => star.name).join(', ');
  return (
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
              <Button variant="outline-secondary" size="sm" className="mx-1">
                <Star className="bi" />
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
      <Col lg={3} sm={4}>
        <Row className="px-2">
          <Col>
            <RelatedMovies
              movie={movie}
              movies={movies}
              showMovieInfo={showMovieInfo}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MovieInfo;
