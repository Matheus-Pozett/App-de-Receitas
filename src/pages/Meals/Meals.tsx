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
  }, []);

  const mealsOnly = recipes.filter(isMeal);

  return (
    <div>
      {mealsOnly.map((r) => (
        <div key={ r.idMeal }>
          <img src={ r.strMealThumb } alt="imagem da receita" />
          <p>{r.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export { Meals };
