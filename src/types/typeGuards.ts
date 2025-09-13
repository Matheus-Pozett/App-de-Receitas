import { Recipe,
  MealSummary,
  DrinkDetailsType,
  DrinksSummary,
  MealDetailsAPI } from './index';

type MealType = MealSummary | MealDetailsAPI;
type DrinkType = DrinkDetailsType | DrinksSummary;

export function isMeal(recipe: Recipe): recipe is MealType {
  return 'idMeal' in recipe;
}

export function isDrink(recipe: Recipe): recipe is DrinkType {
  return 'idDrink' in recipe;
}
