import { useLocation } from 'react-router-dom';
import { useRecipes } from '../../context/RecipesContext';
import { filterDrinkByCategory, filterMealByCategory } from '../../services/api';

type CategoriesProps = {
  category: string
};

function Categories({ category } : CategoriesProps) {
  const { setRecipes } = useRecipes();
  const { pathname } = useLocation();

  const isMealsPage = pathname === '/meals';

  const handleClickCategory = async (value: string) => {
    const fetchCategories = isMealsPage ? filterMealByCategory : filterDrinkByCategory;

    const recipes = await fetchCategories(value);
    setRecipes(recipes.slice(0, 12));
  };

  return (
    <button
      data-testid={ `${category}-category-filter` }
      onClick={ () => handleClickCategory(category) }
    >
      {category}
    </button>
  );
}

export default Categories;
