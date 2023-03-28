import React, { useState } from 'react';
import {
  Button,
  Dropdown,
  Form,
  Image,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/user';
import { useHandleLogout } from '../../utils/hooks';

const Header = () => {
  const [query, setQuery] = useState('');
  const logo = new URL(
    '../../assets/logo.png?as=webp&width=100',
    import.meta.url
  ).toJSON();
  const user = useSelector(selectUser);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${query}`);
  };

  return (
    <Navbar
      fixed="top"
      bg="dark"
      variant="dark"
      expand="sm"
      className="border-bottom px-3"
    >
      <Navbar.Brand as={Link} to="/">
        <Image src={logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline-light" type="submit">
            Search
          </Button>
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
    </Navbar>
  );
};

export default Header;
