import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsInProgress from '../../components/MealsInProgress';
import DrinksInProgress from '../../components/DrinksInProgress';
import { DrinkDetailsType, MealDetailsAPI } from '../../types';
import { fetchDrinksById, fetchMealsById } from '../../services/api';

function RecipeInProgress() {
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
    return <p>Carregando</p>;
  }

  return (
    <div>
      {isMealsPage ? (
        <MealsInProgress recipe={ recipe as MealDetailsAPI } />
      ) : (
        <DrinksInProgress recipe={ recipe as DrinkDetailsType } />
      )}
    </div>
  );
}

export default RecipeInProgress;
