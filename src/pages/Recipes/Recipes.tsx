import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Meals } from '../Meals';
import { Drinks } from '../Drinks';
import { getDrinksCategories, getMealsCategories } from '../../services/api';
import { CategoriesType } from '../../types';
import Categories from '../../components/Categories/Categories';

function Recipes() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const { pathname } = useLocation();

  const isMealsPage = pathname === '/meals';

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchCategories = isMealsPage
          ? getMealsCategories
          : getDrinksCategories;
        const data = await fetchCategories();
        setCategories(data.slice(0, 5));
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };
    getCategories();
  }, [isMealsPage]);

  return (
    <div>
      <div>
        {categories.map(({ strCategory }) => (
          <Categories category={ strCategory } key={ strCategory } />
        ))}
      </div>

      {isMealsPage ? <Meals /> : <Drinks />}
    </div>
  );
}

export { Recipes };
