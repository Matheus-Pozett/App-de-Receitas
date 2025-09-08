import { MealDetailsAPI, MealsIngredientType } from '../types';

// eslint-disable-next-line max-len
export const getMealByIngredient = async (ingredient: string): Promise<MealsIngredientType[] | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMealByName = async (name: string): Promise<MealDetailsAPI[] | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// eslint-disable-next-line max-len
export const getMealByFirstLetter = async (firstLetter: string): Promise<MealDetailsAPI[] | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    console.error(err);
    return null;
  }
};
