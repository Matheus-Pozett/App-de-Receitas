import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Meals } from '../Meals';
import { Drinks } from '../Drinks';
import { getDrinksCategories, getMealsCategories } from '../../services/api';
import { Categories } from '../../types';

function Recipes() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const getCategories = async () => {
      try {
        if (pathname === '/meals') {
          const mealsCategories = await getMealsCategories();
          const sliceCategories = mealsCategories.slice(0, 5);
          setCategories(sliceCategories);
        } else {
          const drinksCategories = await getDrinksCategories();
          const sliceCategories = drinksCategories.slice(0, 5);
          setCategories(sliceCategories);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, [pathname]);

  return (
    <div>
      {pathname === '/meals' ? (
        <div>
          <div>
            {categories.map((category) => (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
          <Meals />
        </div>
      ) : (
        <div>
          <div>
            {categories.map((category) => (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
          <Drinks />
        </div>
      )}
    </div>
  );
}

export { Recipes };
