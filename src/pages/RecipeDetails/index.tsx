/* eslint-disable max-len */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsDetails from '../../components/MealsDetails';
import { fetchDrinksById,
  fetchMealsById,
  getDrinksByName,
  getMealByName } from '../../services/api';
import { DrinkDetailsType, MealDetailsAPI } from '../../types';
import DrinksDetails from '../../components/DrinksDetails';
import { useFavorites } from '../../context/FavoritesContext';
import { useShare } from '../../hooks/useShare';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | DrinkDetailsType | null>(null);
  const [mealRecommendations, setMealRecommendations] = useState<MealDetailsAPI[]>([]);
  const [drinkRecommendations, setDrinkRecommendations] = useState<DrinkDetailsType[]>([]);
  const { pathname } = useLocation();
  const { handleFavorite, isRecipeFavorite } = useFavorites();
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleShare, isLinkCopied } = useShare();

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

  const recipeId = recipe ? (recipe as MealDetailsAPI).idMeal || (recipe as DrinkDetailsType).idDrink : null;
  const isCurrentlyFavorite = recipeId ? isRecipeFavorite(recipeId) : false;

  const handleStartRecipe = () => {
    if (isMealsPage) {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  const handleClickShare = () => {
    const url = `http://localhost:3000${pathname}`;
    handleShare(url);
  };

  const handleFavorites = () => {
    if (!recipe) return;

    handleFavorite(recipe, isMealsPage);
  };
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isMealsPage ? (
        <MealsDetails
          recipeDetail={ recipe as MealDetailsAPI }
          recommendations={ drinkRecommendations }
          handleStartRecipe={ handleStartRecipe }
          handleShare={ handleClickShare }
          isLinkCopied={ isLinkCopied }
          handleFavorite={ handleFavorites }
          isFavorite={ isCurrentlyFavorite }
        />
      ) : (
        <DrinksDetails
          recipeDetail={ recipe as DrinkDetailsType }
          recommendations={ mealRecommendations }
          handleStartRecipe={ handleStartRecipe }
          handleShare={ handleClickShare }
          isLinkCopied={ isLinkCopied }
          handleFavorite={ handleFavorites }
          isFavorite={ isCurrentlyFavorite }
        />
      )}

    </div>
  );
}

export default RecipeDetails;
