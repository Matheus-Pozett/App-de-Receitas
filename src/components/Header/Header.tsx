import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import iconApp from '../../images/icone-recipes-app.svg';
import nameApp from '../../images/name-recipes-app.svg';
import iconSearch from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import { SearchBar } from '../SearchBar/SearchBar';

type HeaderProps = {
  title: string,
  icon: string,
};

function Header({ title, icon }: HeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();

  const showSearchButton = location.pathname !== '/profile'
    && location.pathname !== '/done-recipes'
    && location.pathname !== '/favorite-recipes';

  return (
    <header>
      <Container
        fluid
        className="d-flex align-items-center justify-content-between py-2 px-3"
        style={ { backgroundColor: '#FBC02D' } }
      >
        <div className="d-flex align-items-center gap-2">
          <img
            src={ iconApp }
            alt="icone do app"
            style={ { height: '35px' } }
          />
          <img
            src={ nameApp }
            alt="nome do site"
            style={ { height: '20px' } }
          />
        </div>

        <div className="d-flex align-items-center gap-3">
          {showSearchButton && (
            <Button
              variant="link"
              onClick={ () => setShowSearchBar(!showSearchBar) }
              className="p-0"
            >
              <img
                src={ iconSearch }
                alt="pesquisar"
                data-testid="search-top-btn"
                style={ { height: '24px' } }
              />
            </Button>
          )}

          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="Profile"
              data-testid="profile-top-btn"
              style={ { height: '26px' } }
            />
          </Link>
        </div>
      </Container>

      <Container className="text-center mt-3">
        <Row>
          <Col>
            <img
              src={ icon }
              alt="icone prato"
              style={ { height: '40px' } }
              className="mb-2"
            />
            <h1
              data-testid="page-title"
              className="fw-bold"
              style={ { color: '#4B0082', letterSpacing: '2px' } }
            >
              {title}
            </h1>
          </Col>
        </Row>
      </Container>

      {showSearchBar && (
        <div className="px-3 py-2 bg-light">
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export { Header };
