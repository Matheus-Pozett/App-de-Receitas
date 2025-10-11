/* eslint-disable max-len */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsInProgress from '../../components/MealsInProgress';
import DrinksInProgress from '../../components/DrinksInProgress';
import { DrinkDetailsType, DoneRecipesType, MealDetailsAPI } from '../../types';
import { fetchDrinksById, fetchMealsById } from '../../services/api';
import { useFavorites } from '../../context/FavoritesContext';
import { useShare } from '../../hooks/useShare';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | DrinkDetailsType | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { handleFavorite, isRecipeFavorite } = useFavorites();
  const { isLinkCopied, handleShare } = useShare();

  const isMealsPage = pathname.includes('/meals');
  const recipeId = isMealsPage ? (recipe as MealDetailsAPI)?.idMeal : (recipe as DrinkDetailsType)?.idDrink;

  useEffect(() => {
    const getRecipeDetail = async () => {
      if (id) {
        const data = isMealsPage ? await fetchMealsById(id) : await fetchDrinksById(id);
        setRecipe(data);
      }
    };
    getRecipeDetail();
  }, [id, isMealsPage]);

  useEffect(() => {
    if (recipeId) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      const recipeTypeKey = isMealsPage ? 'meals' : 'drinks';
      if (inProgressRecipes[recipeTypeKey]?.[recipeId]) {
        setCheckedIngredients(inProgressRecipes[recipeTypeKey][recipeId]);
      }
    }
  }, [recipeId, isMealsPage]);

  const handleCheckboxChange = (ingredient: string) => {
    const newChecked = checkedIngredients.includes(ingredient)
      ? checkedIngredients.filter((item) => item !== ingredient)
      : [...checkedIngredients, ingredient];

    setCheckedIngredients(newChecked);

    if (recipeId) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      const recipeTypeKey = isMealsPage ? 'meals' : 'drinks';
      const updatedInProgress = {
        ...inProgressRecipes,
        [recipeTypeKey]: { ...inProgressRecipes[recipeTypeKey], [recipeId]: newChecked },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgress));
    }
  };

  const handleFinishRecipe = () => {
    if (!recipe) return;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const doneRecipes: DoneRecipesType[] = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipe: DoneRecipesType = {
      id: recipeId,
      type: isMealsPage ? 'meal' : 'drink',
      nationality: (recipe as MealDetailsAPI).strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: (recipe as DrinkDetailsType).strAlcoholic || '',
      name: isMealsPage ? (recipe as MealDetailsAPI).strMeal : (recipe as DrinkDetailsType).strDrink,
      image: isMealsPage ? (recipe as MealDetailsAPI).strMealThumb : (recipe as DrinkDetailsType).strDrinkThumb,
      doneDate: formattedDate,
      tags: (recipe as MealDetailsAPI).strTags?.split(',') || [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    navigate('/done-recipes');
  };

  if (!recipe) {
    return (
      <div className="loader-details-container">
        <span className="loader-details" />
      </div>
    );
  }

  const props = {
    recipe,
    checkedIngredients,
    handleCheckboxChange,
    handleFinishRecipe,
    isFavorite: isRecipeFavorite(recipeId),
    handleFavorite: () => handleFavorite(recipe, isMealsPage),
    isLinkCopied,
    handleShare: () => handleShare(window.location.href.replace('/in-progress', '')),
  };

  return (
    <div>
      {isMealsPage ? (
        <MealsInProgress { ...props } recipe={ recipe as MealDetailsAPI } />
      ) : (
        <DrinksInProgress { ...props } recipe={ recipe as DrinkDetailsType } />
      )}
    </div>
  );
}

export default RecipeInProgress;
