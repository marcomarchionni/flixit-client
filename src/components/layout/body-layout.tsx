import React from 'react';
import { Container } from 'react-bootstrap';

const BodyWrapper = ({ children }) => {
  return (
    <Container fluid className="bg-dark min-vh-100">
      {children}
    </Container>
  );
};

export default BodyWrapper;
