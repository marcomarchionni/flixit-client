import React from 'react';
import { Col, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Col className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  );
};

export default Loading;
