import React, { useState } from 'react';
import { Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/user';
import { useHandleLogout } from '../../hooks/hooks';
import NavSearch from '../nav-search/nav-search';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
  const logo = new URL(
    '../../assets/flixit-logo.png',
    import.meta.url
  ).toJSON();
  const [expanded, setExpanded] = useState(false);
  const user = useAppSelector(selectUser);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const showSearch = () => {
    return !(
      pathname === '/login' ||
      pathname === '/signup' ||
      (user && pathname === `/users/${user.username}/profile`)
    );
  };

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`search/${query}`);
    } else {
      navigate('/movies');
    }
    setExpanded(false);
  };

  return (
    <Navbar
      fixed="top"
      bg="dark"
      variant="dark"
      expand="sm"
      collapseOnSelect
      className="border-bottom px-3"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Navbar.Brand as={Link} to="/" className="py-1">
        <Image src={logo} width="100" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {showSearch() && <NavSearch handleSearch={handleSearch} />}
        <Nav className="flex-grow-1 justify-content-end">
          {!user && (
            <>
              <Nav.Link as={Link} to="/login" href="/login" className="p-2">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" href="/signup" className="p-2">
                Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <NavDropdown
                title={user.username}
                id="collapsible-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/users/${user.username}/profile`}
                  href={`/users/${user.username}/profile`}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={`/users/${user.username}/favourites`}
                  href={`/users/${user.username}/favourites`}
                >
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} href="#">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
