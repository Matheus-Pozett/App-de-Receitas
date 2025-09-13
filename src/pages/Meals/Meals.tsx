import { Link } from 'react-router-dom';
import { useRecipes } from '../../context/RecipesContext';
import { isMeal } from '../../types/typeGuards';

function Meals() {
  const { recipes } = useRecipes();

  const meals = recipes.filter(isMeal);

  return (
    <div>
      {meals.map((r, index) => (
        <Link
          key={ r.idMeal }
          data-testid={ `${index}-recipe-card` }
          to={ `/meals/${r.idMeal}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            style={ { width: '100%', maxWidth: '300px', height: 'auto' } }
            src={ r.strMealThumb }
            alt="imagem da receita"
          />
          <p data-testid={ `${index}-card-name` }>{r.strMeal}</p>
        </Link>
      ))}
    </div>
  );
}

export { Meals };
