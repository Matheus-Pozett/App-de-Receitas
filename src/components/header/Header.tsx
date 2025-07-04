import imgPage from '../../images/iconeRecipesapp.svg';
import imgProfile from '../../images/profileIcon.svg';
import imgSearch from '../../images/searchIcon.svg';

type HeaderProps = {
  title: string
  iconSearch: boolean;
};

function Header({ title, iconSearch }: HeaderProps) {
  return (
    <header>
      <img src={ imgPage } alt="Logo da pagina" />
      <p>Recipes App</p>
      {iconSearch && <img
        src={ imgSearch }
        alt="Icone de pesquisa"
        data-testid="search-top-btn"
      />}
      <img src={ imgProfile } alt="Icone do Perfil" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export { Header };
