import { Link } from 'react-router-dom';
import { useRecipes } from '../../context/RecipesContext';
import { isMeal } from '../../types/typeGuards';

function Meals() {
  const { recipes } = useRecipes();

  const meals = recipes.filter(isMeal);

  return (
    <div className="container pb-5">
      <div className="row">
        {meals.map((r, index) => (
          <div key={ r.idMeal } className="col-6 mb-3">
            <Link
              data-testid={ `${index}-recipe-card` }
              to={ `/meals/${r.idMeal}` }
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ r.strMealThumb }
                  alt={ `Imagem da receita ${r.strMeal}` }
                  className="card-img-top"
                />
                <div className="card-body p-2 text-center">
                  <p
                    data-testid={ `${index}-card-name` }
                    className="card-title fw-medium mb-0"
                  >
                    {r.strMeal}
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

export default Meals;
