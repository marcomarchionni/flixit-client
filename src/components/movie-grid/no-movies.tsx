import React from 'react';
import { Col, Row } from 'react-bootstrap';

const NoMovies = () => {
  return (
    <Row>
      <Col md={8}>
        <p>Sorry, no movies to show!</p>
      </Col>
    </Row>
  );
};

export default NoMovies;
