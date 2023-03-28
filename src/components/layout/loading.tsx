import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Spinner animation="border" variant="light" role="status" className="my-5">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
