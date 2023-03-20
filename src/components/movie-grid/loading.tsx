import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Row>
      <Col className="text-center mt-5">
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
};

export default Loading;
