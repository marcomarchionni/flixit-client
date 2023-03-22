import React, { MouseEventHandler } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/interfaces';

interface HeaderProps {
  user: User | null;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ user, handleLogout }: HeaderProps) => {
  const logo = new URL(
    '../../assets/logo.png?as=webp&width=100',
    import.meta.url
  ).toJSON();

  return (
    <Navbar
      fixed="top"
      bg="dark"
      variant="dark"
      expand="sm"
      className="border-bottom"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="px-2">
          <Image src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav className="flex-grow-1 justify-content-end">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-light">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="outline-light">Signup</Button>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Dropdown as={NavItem}>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/users/${user.username}/profile`}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/users/${user.username}/favourites`}
                    >
                      Favourites
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;