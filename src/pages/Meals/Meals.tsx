import { useRecipes } from '../../context/RecipesContext';
import { isMeal } from '../../types/typeGuards';

function Meals() {
  const { recipes } = useRecipes();

  const meals = recipes.filter(isMeal);

  return (
    <div>
      {meals.map((r, index) => (
        <div key={ r.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ r.strMealThumb }
            alt="imagem da receita"
          />
          <p data-testid={ `${index}-card-name` }>{r.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export { Meals };
