import { Link } from 'react-router-dom';
import { useRecipes } from '../../context/RecipesContext';
import { isDrink } from '../../types/typeGuards';

function Drinks() {
  const { recipes } = useRecipes();

  const drinks = recipes.filter(isDrink);

  return (
    <div className="container pb-5">
      <div className="row">
        {drinks.map((drink, index) => (
          <div key={ drink.idDrink } className="col-6 mb-3">
            <Link
              data-testid={ `${index}-recipe-card` }
              to={ `/drinks/${drink.idDrink}` }
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={ drink.strDrinkThumb }
                  alt={ `Imagem da bebida ${drink.strDrink}` }
                  data-testid={ `${index}-card-img` }
                  className="card-img-top"
                />
                <div className="card-body p-2 text-center">
                  <p
                    data-testid={ `${index}-card-name` }
                    className="card-title fw-medium mb-0"
                  >
                    {drink.strDrink}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Drinks };
