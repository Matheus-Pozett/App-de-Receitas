import { useEffect, useState } from 'react';
import { DoneRecipesType } from '../../types';
import DoneRecipeMealCard from '../../components/DoneRecipeMeal';
import DoneRecipeDrinkCard from '../../components/DoneRecipeDrink';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [filterButton, setFilterButton] = useState('all');

  useEffect(() => {
    const getStorage = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    setDoneRecipes(getStorage);
  }, []);

  const filteredDoneRecipes = doneRecipes.filter((recipe) => {
    if (filterButton === 'all') {
      return true;
    }
    return recipe.type === filterButton;
  });

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterButton('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterButton('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterButton('drink') }
        >
          Drinks
        </button>
      </div>

      {filteredDoneRecipes.map((recipe, index) => {
        if (recipe.type === 'meal') {
          return (
            <DoneRecipeMealCard
              recipe={ recipe }
              index={ index }
              key={ recipe.id }
            />
          );
        }
        return (
          <DoneRecipeDrinkCard
            recipe={ recipe }
            index={ index }
            key={ recipe.id }
          />
        );
      })}
    </div>
  );
}

export default DoneRecipes;
