import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoriesDrinks, getCategoriesMeals, getDrinks,
  getMeals } from '../../services/api';
import { Meals } from '../meals';
import { Drinks } from '../drinks';
import { CategoriesType, DrinksType, MealsType } from '../../types';
import { Categories } from '../../components';

function Recipes() {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<MealsType[] | DrinksType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (pathname === '/meals') {
          const getRecipes = await getMeals();
          setRecipes(getRecipes);
        } else {
          const getRecipes = await getDrinks();
          setRecipes(getRecipes);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (pathname === '/meals') {
          const getCategories = await getCategoriesMeals();
          setCategories(getCategories);
        } else {
          const getCategories = await getCategoriesDrinks();
          setCategories(getCategories);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [pathname]);

  return (
    <div>
      {pathname === '/meals' && (
        <div>
          <Categories categories={ categories } />
          <Meals recipes={ recipes as MealsType[] } />
        </div>
      )}
      {pathname === '/drinks' && (
        <div>
          <Categories categories={ categories } />
          <Drinks recipes={ recipes as DrinksType[] } />
        </div>

      )}
    </div>
  );
}

export { Recipes };
