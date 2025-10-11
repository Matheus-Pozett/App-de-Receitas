import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Meals from '../../components/Meals';
import Drinks from '../../components/Drinks';
import {
  filterDrinkByCategory,
  filterMealByCategory,
  getDrinksByName,
  getDrinksCategories,
  getMealByName,
  getMealsCategories,
} from '../../services/api';
import { CategoriesType } from '../../types';
import Categories from '../../components/Categories';
import { useRecipes } from '../../context/RecipesContext';
import iconAll from '../../images/icone-prato.svg';
import beefIcon from '../../images/beefIcon.svg';
import goatIcon from '../../images/goatIcon.svg';
import chickenIcon from '../../images/chickenIcon.svg';
import dessertIcon from '../../images/dessertIcon.svg';
import breakfastIcon from '../../images/breakfastIcon.svg';
import cocktailIcon from '../../images/cocktailIcon.svg';
import cocoaIcon from '../../images/cocoaIcon.svg';
import ordinaryIcon from '../../images/ordinaryIcon.svg';
import shakeIcon from '../../images/shakeIcon.svg';
import otherIcon from '../../images/otherIcon.svg';

const categoryIcons: { [key: string]: string } = {
  Beef: beefIcon,
  Breakfast: breakfastIcon,
  Chicken: chickenIcon,
  Dessert: dessertIcon,
  Goat: goatIcon,
  Cocktail: cocktailIcon,
  'Ordinary Drink': ordinaryIcon,
  'Punch / Party Drink': cocoaIcon,
  Shake: shakeIcon,
  'Other / Unknown': otherIcon,
};

function Recipes() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const { recipes, setRecipes } = useRecipes();

  const isMealsPage = pathname === '/meals';

  const fetchInitialRecipes = async () => {
    try {
      setIsLoading(true);
      const fetchFunction = isMealsPage ? getMealByName('') : getDrinksByName('w');
      const initialRecipes = await fetchFunction;
      setRecipes(initialRecipes.slice(0, 12));
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
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
    fetchInitialRecipes();
  }, [isMealsPage]);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === activeFilter) {
      fetchInitialRecipes();
      setActiveFilter('');
      return;
    }

    try {
      setIsLoading(true);
      const fetchByCategory = isMealsPage ? filterMealByCategory : filterDrinkByCategory;
      const filteredRecipes = await fetchByCategory(categoryName);
      setRecipes(filteredRecipes.slice(0, 12));
      setActiveFilter(categoryName);
    } catch (error) {
      console.error(`Erro ao filtrar por ${categoryName}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* CATEGORIAS */}
      <div className="container my-3">
        <div className="row justify-content-center text-center">
          <div className="col-2 d-flex justify-content-center mb-3">
            <button
              data-testid="All-category-filter"
              onClick={ fetchInitialRecipes }
              className="btn d-flex flex-column align-items-center text-warning"
            >
              <div
                className="d-flex justify-content-center align-items-center border
                border-warning rounded-circle p-3 mb-1"
              >
                <img
                  src={ iconAll }
                  alt="Todas categorias"
                  style={ { width: '28px', height: '28px' } }
                />
              </div>
              <small className="text-dark fw-medium">All</small>
            </button>
          </div>

          {categories.map(({ strCategory }) => (
            <Categories
              category={ strCategory }
              key={ strCategory }
              handleCategoryClick={ handleCategoryClick }
              img={ categoryIcons[strCategory] }
            />
          ))}
        </div>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <div className="container">
          <div className="row justify-content-center">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={ index }
                className="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
              >
                <span className="loader" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {isMealsPage ? <Meals /> : <Drinks />}
        </div>
      )}
    </div>
  );
}

export default Recipes;
