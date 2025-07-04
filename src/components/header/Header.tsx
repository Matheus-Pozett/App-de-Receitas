import { Link } from 'react-router-dom';
import { useState } from 'react';
import imgPage from '../../images/iconeRecipesapp.svg';
import imgProfile from '../../images/profileIcon.svg';
import imgSearch from '../../images/searchIcon.svg';

type HeaderProps = {
  title: string
  iconSearch: boolean;
};

function Header({ title, iconSearch }: HeaderProps) {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <header>
      <img src={ imgPage } alt="Logo da pagina" />
      <p>Recipes App</p>
      {iconSearch && (
        <button onClick={ handleClick }>
          <img
            src={ imgSearch }
            alt="Icone de pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      )}
      <Link to="/profile">
        <img src={ imgProfile } alt="Icone do Perfil" data-testid="profile-top-btn" />
      </Link>

      <h1 data-testid="page-title">{title}</h1>
      {showInput && <input data-testid="search-input" />}
    </header>
  );
}

export { Header };
