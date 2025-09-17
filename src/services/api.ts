/* eslint-disable max-len */
import { CategoriesType, DrinkDetailsType, DrinksSummary, MealDetailsAPI, MealSummary, Recipe } from '../types';

export const getMealByIngredient = async (ingredient: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMealByName = async (name: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMealByFirstLetter = async (firstLetter: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data.meals || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getDrinksByIngredient = async (ingredient: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();

    if (!data.drinks || typeof data.drinks === 'string') {
      return [];
    }

    return data.drinks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDrinksByName = async (name: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDrinksByFirstLetter = async (f: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${f}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMealsCategories = async (): Promise<CategoriesType[]> => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDrinksCategories = async (): Promise<CategoriesType[]> => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const filterMealByCategory = async (category: string): Promise<MealSummary[]> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const filterDrinkByCategory = async (category: string): Promise<DrinksSummary[]> => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMealsById = async (id: string): Promise<MealDetailsAPI | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchDrinksById = async (id: string): Promise<DrinkDetailsType | null> => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
