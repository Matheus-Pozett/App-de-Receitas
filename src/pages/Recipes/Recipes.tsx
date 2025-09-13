import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Meals } from '../Meals';
import { Drinks } from '../Drinks';
import { filterDrinkByCategory, filterMealByCategory, getDrinksByName,
  getDrinksCategories,
  getMealByName,
  getMealsCategories } from '../../services/api';
import { CategoriesType } from '../../types';
import Categories from '../../components/Categories/Categories';
import { useRecipes } from '../../context/RecipesContext';

function Recipes() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const { pathname } = useLocation();
  const { recipes, setRecipes } = useRecipes();

  const isMealsPage = pathname === '/meals';

  const fetchInitialRecipes = async () => {
    try {
      const fetchFunction = isMealsPage ? getMealByName('') : getDrinksByName('w');
      const initialRecipes = await fetchFunction;
      setRecipes(initialRecipes.slice(0, 12));
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      setRecipes([]);
    }
  };

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

  useEffect(() => {
    if (recipes.length === 0) {
      fetchInitialRecipes();
    }
  }, [recipes.length]);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === activeFilter) {
      fetchInitialRecipes();
      setActiveFilter('');
      return;
    }

    try {
      const fetchByCategory = isMealsPage ? filterMealByCategory : filterDrinkByCategory;
      const filteredRecipes = await fetchByCategory(categoryName);
      setRecipes(filteredRecipes.slice(0, 12));
      setActiveFilter(categoryName);
    } catch (error) {
      console.error(`Erro ao filtrar por ${categoryName}:`, error);
    }
  };

  return (
    <div>
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ fetchInitialRecipes }
        >
          All
        </button>
        {categories.map(({ strCategory }) => (
          <Categories
            category={ strCategory }
            key={ strCategory }
            handleCategoryClick={ handleCategoryClick }
          />
        ))}
      </div>

      {isMealsPage ? <Meals /> : <Drinks />}
    </div>
  );
}

export { Recipes };
