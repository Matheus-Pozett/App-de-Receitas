import { Recipe,
  MealsIngredientType,
  DrinkDetailsType,
  DrinksIngredientType,
  MealDetailsAPI } from './index';

type MealType = MealsIngredientType | MealDetailsAPI;
type DrinkType = DrinkDetailsType | DrinksIngredientType;

export function isMeal(recipe: Recipe): recipe is MealType {
  return 'idMeal' in recipe;
}

export function isDrink(recipe: Recipe): recipe is DrinkType {
  return 'idDrink' in recipe;
}
