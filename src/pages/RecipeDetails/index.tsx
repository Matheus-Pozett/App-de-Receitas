/* eslint-disable max-len */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsDetails from '../../components/MealsDetails';
import { fetchDrinksById,
  fetchMealsById,
  getDrinksByName,
  getMealByName } from '../../services/api';
import { DrinkDetailsType, FavoritesType, MealDetailsAPI } from '../../types';
import DrinksDetails from '../../components/DrinksDetails';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealDetailsAPI | DrinkDetailsType | null>(null);
  const [mealRecommendations, setMealRecommendations] = useState<MealDetailsAPI[]>([]);
  const [drinkRecommendations, setDrinkRecommendations] = useState<DrinkDetailsType[]>([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (recipe) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const recipeId = (recipe as MealDetailsAPI).idMeal || (recipe as DrinkDetailsType).idDrink;
      setIsFavorite(favoriteRecipes.some((fav: FavoritesType) => fav.id === recipeId));
    }
  }, [recipe]);

  const handleStartRecipe = () => {
    if (isMealsPage) {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  const handleShare = () => {
    const url = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 3000);
      });
  };

  const handleFavorite = () => {
    if (!recipe) return;

    const oldFavorites: FavoritesType[] = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );

    let newFavorite: FavoritesType;

    if (isMealsPage) {
      const meal = recipe as MealDetailsAPI;
      newFavorite = {
        id: meal.idMeal,
        type: 'meal',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
    } else {
      const drink = recipe as DrinkDetailsType;
      newFavorite = {
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
    }

    const alreadyExists = oldFavorites.some((fav) => fav.id === newFavorite.id);
    let newFavorites;

    if (alreadyExists) {
      newFavorites = oldFavorites.filter((fav) => fav.id !== newFavorite.id);
      setIsFavorite(false);
    } else {
      newFavorites = [...oldFavorites, newFavorite];
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
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
          handleShare={ handleShare }
          isLinkCopied={ isLinkCopied }
          handleFavorite={ handleFavorite }
          isFavorite={ isFavorite }
        />
      ) : (
        <DrinksDetails
          recipeDetail={ recipe as DrinkDetailsType }
          recommendations={ mealRecommendations }
          handleStartRecipe={ handleStartRecipe }
          handleShare={ handleShare }
          isLinkCopied={ isLinkCopied }
          handleFavorite={ handleFavorite }
          isFavorite={ isFavorite }
        />
      )}

    </div>
  );
}

export default RecipeDetails;
