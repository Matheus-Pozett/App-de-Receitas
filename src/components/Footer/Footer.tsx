import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="fixed-bottom d-flex justify-content-between align-items-center px-4 py-2"
      style={ { backgroundColor: '#5D2CA8' } }
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="botão para página de bebidas"
          data-testid="drinks-bottom-btn"
          className="img-fluid"
          style={ { width: '32px', height: '32px' } }
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="botão para página de comidas"
          data-testid="meals-bottom-btn"
          className="img-fluid "
          style={ { width: '32px', height: '32px' } }
        />
      </Link>
    </footer>
  );
}

export { Footer };
