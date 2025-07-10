import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoriesDrinks, getCategoriesMeals, getDrinks,
  getMeals } from '../../services/api';
import { Meals } from '../meals';
import { Drinks } from '../drinks';
import { CategoriesType, DrinksType, MealsType } from '../../types';
import { Categories } from '../../components';

  type FetchFunctionType = () => Promise<MealsType[] | DrinksType[]>;
  type FetchCategoriesType = () => Promise<CategoriesType[]>;

function Recipes() {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<MealsType[] | DrinksType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  const fetchRecipesFunction: FetchFunctionType = (pathname === '/meals')
    ? getMeals : getDrinks;

  const fetchCategoriesFunction: FetchCategoriesType = (pathname === '/meals')
    ? getCategoriesMeals : getCategoriesDrinks;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await fetchRecipesFunction();
        setRecipes(recipesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [fetchRecipesFunction]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategoriesFunction();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [fetchCategoriesFunction]);

  return (
    <div>
      {pathname === '/meals' && (
        <div>
          <Categories
            categories={ categories }
            setRecipes={ setRecipes }
            pathname={ pathname }
          />
          <Meals recipes={ recipes as MealsType[] } />
        </div>
      )}
      {pathname === '/drinks' && (
        <div>
          <Categories
            categories={ categories }
            setRecipes={ setRecipes }
            pathname={ pathname }
          />
          <Drinks recipes={ recipes as DrinksType[] } />
        </div>

      )}
    </div>
  );
}

export { Recipes };
