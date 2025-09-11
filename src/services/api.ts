/* eslint-disable max-len */
import { Recipe } from '../types';

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
    return data.drinks || [];
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
