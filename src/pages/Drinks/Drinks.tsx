import { Link } from 'react-router-dom';
import { useRecipes } from '../../context/RecipesContext';
import { isDrink } from '../../types/typeGuards';

function Drinks() {
  const { recipes } = useRecipes();

  const drinks = recipes.filter(isDrink);

  return (
    <div>
      {drinks.map((drink, index) => (
        <Link
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          to={ `/drinks/${drink.idDrink}` }
        >
          <img
            src={ drink.strDrinkThumb }
            style={ { width: '100%', maxWidth: '300px', height: 'auto' } }
            alt="imagem da bebida"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </Link>
      ))}
    </div>
  );
}

export { Drinks };
