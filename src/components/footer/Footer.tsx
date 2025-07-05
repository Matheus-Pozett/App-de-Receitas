import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="icone de bebidas" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="Icone de comidas" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export { Footer };
