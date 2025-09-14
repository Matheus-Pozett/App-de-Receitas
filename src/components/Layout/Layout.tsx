import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import mealsIcon from '../../images/icone-prato.svg';
import doneIcon from '../../images/doneIcon.svg';
import drinksIcon from '../../images/drinksIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import favoriteIcon from '../../images/favoritesIcon.svg';

function Layout() {
  const location = useLocation();

  const getHeaderContent = () => {
    switch (location.pathname) {
      case '/meals':
        return { title: 'Meals', icon: mealsIcon };
      case '/drinks':
        return { title: 'Drinks', icon: drinksIcon };
      case '/profile':
        return { title: 'Profile', icon: profileIcon };
      case '/done-recipes':
        return { title: 'Done Recipes', icon: doneIcon };
      case '/favorite-recipes':
        return { title: 'Favorite Recipes', icon: favoriteIcon };
      default:
        return { title: '', icon: '' };
    }
  };

  const { title, icon } = getHeaderContent();

  return (
    <div>
      <Header title={ title } icon={ icon } />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export { Layout };
