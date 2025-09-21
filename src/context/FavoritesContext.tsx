/* eslint-disable max-len */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DrinkDetailsType, FavoritesType, MealDetailsAPI } from '../types';

type FavoriteContextType = {
  favorites: FavoritesType[];
  handleFavorite: (recipe: MealDetailsAPI | DrinkDetailsType, isMealsPage: boolean) => void;
  isRecipeFavorite: (id: string) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteContextProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritesType[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = (recipe: MealDetailsAPI | DrinkDetailsType, isMealsPage: boolean) => {
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

    const alreadyExists = favorites.some((fav) => fav.id === newFavorite.id);
    let updatedFavorites;

    if (alreadyExists) {
      updatedFavorites = favorites.filter((fav) => fav.id !== newFavorite.id);
    } else {
      updatedFavorites = [...favorites, newFavorite];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const isRecipeFavorite = (id: string): boolean => {
    return favorites.some((fav) => fav.id === id);
  };

  const values = useMemo(() => ({
    favorites,
    handleFavorite,
    isRecipeFavorite,
  }), [favorites]);

  return (
    <FavoriteContext.Provider value={ values }>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesContextProvider');
  }

  return context;
};
