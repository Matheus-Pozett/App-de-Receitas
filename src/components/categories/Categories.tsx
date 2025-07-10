import { useState } from 'react';
import { filterCategoryDrinks, filterCategoryMeals, getDrinks,
  getMeals } from '../../services/api';
import { CategoriesType, DrinksType, MealsType } from '../../types';

type CategoriesProps = {
  categories: CategoriesType[];
  setRecipes: (recipe: MealsType[] | DrinksType[]) => void;
  pathname: string;
};

function Categories({ categories, setRecipes, pathname }: CategoriesProps) {
  const [activeFilter, setActiveFilter] = useState('');

  const handleClickCategory = async (strCategory: string) => {
    if (activeFilter === strCategory) {
      handleClickAll();
    } else {
      if (pathname === '/meals') {
        setRecipes(await filterCategoryMeals(strCategory));
      } else {
        setRecipes(await filterCategoryDrinks(strCategory));
      }
      setActiveFilter(strCategory);
    }
  };

  const handleClickAll = async () => {
    if (pathname === '/meals') {
      setRecipes(await getMeals());
      setActiveFilter('');
    } else {
      setRecipes(await getDrinks());
      setActiveFilter('');
    }
  };

  return (
    <div>
      <button data-testid="All-category-filter" onClick={ handleClickAll }>All</button>
      {categories.slice(0, 5).map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => handleClickCategory(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export { Categories };
