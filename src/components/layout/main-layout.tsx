import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface MainWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <Row className="main-padding-top">
      <Col xxl={10} className="mx-auto d-flex flex-column align-items-center">
        {children}
      </Col>
    </Row>
  );
};

export default MainWrapper;
