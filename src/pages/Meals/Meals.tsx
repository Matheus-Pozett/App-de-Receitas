import { useEffect } from 'react';
import { useRecipes } from '../../context/RecipesContext';
import { getMealByName } from '../../services/api';
import { isMeal } from '../../types/typeGuards';

function Meals() {
  const { recipes, setRecipes } = useRecipes();

  useEffect(() => {
    const getRecipesMeals = async () => {
      try {
        const getMeals = await getMealByName('');
        const meals = getMeals.slice(0, 12);
        setRecipes(meals);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipesMeals();
  }, [setRecipes]);

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
