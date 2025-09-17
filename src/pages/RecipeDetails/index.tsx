import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsDetails from '../MealsDetails/MealsDetails';
import { fetchDrinksById, fetchMealsById } from '../../services/api';
import { DrinkDetailsType, MealDetailsAPI } from '../../types';
import DrinksDetails from '../DrinksDetails';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | DrinkDetailsType | null>(null);
  const { pathname } = useLocation();
  const { id } = useParams();

  const isMealsPage = pathname.includes('/meals');

  useEffect(() => {
    const getRecipeDetail = async () => {
      try {
        if (id) {
          const getRecipes = isMealsPage ? fetchMealsById(id) : fetchDrinksById(id);
          const recipes = await getRecipes;
          setRecipe(recipes);
        }
      } catch (err) {
        console.log('erro ao buscar na api');
      }
    };
    getRecipeDetail();
  }, [id, isMealsPage]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isMealsPage ? (
        <MealsDetails recipeDetail={ recipe as MealDetailsAPI } />
      ) : (
        <DrinksDetails recipeDetail={ recipe as DrinkDetailsType } />
      )}

    </div>
  );
}

export default RecipeDetails;
