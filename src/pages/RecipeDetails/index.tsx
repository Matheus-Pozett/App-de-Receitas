import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsDetails from '../MealsDetails/MealsDetails';
import { fetchMealsById } from '../../services/api';
import { MealDetailsAPI } from '../../types';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | null>(null);
  // const { pathname } = useLocation();
  const { id } = useParams();

  // const isMealsPage = pathname.includes('/meals');

  useEffect(() => {
    const getRecipeDetail = async () => {
      try {
        if (id) {
          const recipeDetail = await fetchMealsById(id);
          setRecipe(recipeDetail);
        }
      } catch (err) {
        console.log('erro ao buscar na api');
      }
    };
    getRecipeDetail();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MealsDetails recipeDetail={ recipe } />
    </div>
  );
}

export default RecipeDetails;
