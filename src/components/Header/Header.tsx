import iconApp from '../../images/icone-recipes-app.svg';
import nameApp from '../../images/name-recipes-app.svg';
import iconSearch from '../../images/searchIcon.svg';
import iconProfile from '../../images/profileIcon.svg';

type HeaderProps = {
  title: string,
};

function Header({ title }: HeaderProps) {
  return (
    <header>
      <div>
        <img src={ iconApp } alt="icone do app" />
        <img src={ nameApp } alt="nome do site" />
        <button data-testid="search-top-btn">
          <img src={ iconSearch } alt=" pesquisar" />
        </button>

        <button data-testid="profile-top-btn">
          <img src={ iconProfile } alt="Profile" />
        </button>
      </div>

      <h1 data-testid="page-title">{title}</h1>

    </header>
  );
}

export { Header };
