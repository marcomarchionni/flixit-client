import React from 'react';
import { Spinner } from 'react-bootstrap';
import MainWrapper from '../layout/main-wrapper';

const Loading = () => {
  return (
    <MainWrapper>
      <Spinner
        animation="border"
        variant="light"
        role="status"
        className="my-5"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </MainWrapper>
  );
};

export default Loading;
