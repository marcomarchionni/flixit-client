import React, { MouseEventHandler } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

interface HeaderProps {
  isLogged: boolean;
  handleShowHome: MouseEventHandler<HTMLButtonElement>;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ isLogged, handleShowHome, handleLogout }: HeaderProps) => {
  const logo = new URL(
    '../../assets/film.png?as=webp&width=100',
    import.meta.url
  ).toJSON();

  return (
    <Row className="bg-white py-2 align-items-center border-bottom border-secondary">
      <Col sm={0}>
        <img src={logo} />
      </Col>
      <Col className="text-center">
        <h1 className="mt-1">ItFlix</h1>
      </Col>
      <Col className="d-flex justify-content-end">
        {isLogged && (
          <>
            <Button
              variant="outline-dark"
              className="mx-2 my-2"
              onClick={handleShowHome}
            >
              Home
            </Button>
            <Button variant="dark" className="mx-2 my-2" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Header;
