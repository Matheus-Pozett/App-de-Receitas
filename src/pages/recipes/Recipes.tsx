import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinks, getMeals } from '../../services/api';
import { Meals } from '../meals';
import { Drinks } from '../drinks';
import { DrinksType, MealsType } from '../../types';

function Recipes() {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState<MealsType[] | DrinksType[]>([]);

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

  return (
    <div>
      {pathname === '/meals' && <Meals recipes={ recipes as MealsType[] } />}
      {pathname === '/drinks' && <Drinks recipes={ recipes as DrinksType[] } />}
    </div>
  );
}

export { Recipes };
