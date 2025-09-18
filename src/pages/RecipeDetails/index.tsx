/* eslint-disable max-len */
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsDetails from '../MealsDetails/MealsDetails';
import { fetchDrinksById,
  fetchMealsById,
  getDrinksByName,
  getMealByName } from '../../services/api';
import { DrinkDetailsType, MealDetailsAPI } from '../../types';
import DrinksDetails from '../DrinksDetails';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | DrinkDetailsType | null>(null);
  const [mealRecommendations, setMealRecommendations] = useState<MealDetailsAPI[]>([]);
  const [drinkRecommendations, setDrinkRecommendations] = useState<DrinkDetailsType[]>([]);
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

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        if (isMealsPage) {
          const data = await getDrinksByName('w');
          setDrinkRecommendations(data.slice(0, 6) as DrinkDetailsType[]);
        } else {
          const data = await getMealByName('');
          setMealRecommendations(data.slice(0, 6) as MealDetailsAPI[]);
        }
      } catch (error) {
        console.log('erro ao buscar recomendações');
      }
    };
    getRecommendations();
  }, [isMealsPage]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isMealsPage ? (
        <MealsDetails
          recipeDetail={ recipe as MealDetailsAPI }
          recommendations={ drinkRecommendations }
        />
      ) : (
        <DrinksDetails
          recipeDetail={ recipe as DrinkDetailsType }
          recommendations={ mealRecommendations }
        />
      )}

    </div>
  );
}

export default RecipeDetails;
