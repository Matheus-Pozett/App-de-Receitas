import { useLocation } from 'react-router-dom';
import iconApp from '../../images/icone-recipes-app.svg';
import nameApp from '../../images/name-recipes-app.svg';
import iconSearch from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

type HeaderProps = {
  title: string,
};

function Header({ title }: HeaderProps) {
  const location = useLocation();

  const showSearchButton = location.pathname !== '/profile'
    && location.pathname !== '/done-recipes'
    && location.pathname !== '/favorite-recipes';

  return (
    <header>
      <div>
        <img src={ iconApp } alt="icone do app" />
        <img src={ nameApp } alt="nome do site" />

        {showSearchButton && (
          <button>
            <img src={ iconSearch } alt=" pesquisar" data-testid="search-top-btn" />
          </button>
        )}

        <button>
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </button>
      </div>

      <h1 data-testid="page-title">{title}</h1>

    </header>
  );
}

export { Header };
