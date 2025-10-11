// src/pages/DoneRecipes.tsx
import { useEffect, useState } from 'react';
import { DoneRecipesType } from '../../types';
import DoneRecipeMealCard from '../../components/DoneRecipeMeal';
import DoneRecipeDrinkCard from '../../components/DoneRecipeDrink';
import allIcon from '../../images/allFavoriteIcon.svg';
import mealsIcon from '../../images/icone-prato.svg';
import drinksIcon from '../../images/drinksIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [filterButton, setFilterButton] = useState('all');

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(getStorage);
  }, []);

  const filteredDoneRecipes = doneRecipes.filter((recipe) => {
    if (filterButton === 'all') return true;
    return recipe.type === filterButton;
  });

  return (
    <div className="container pb-5">
      <div className="d-flex justify-content-around my-3 text-center">
        <div>
          <button
            className="btn btn-outline-warning rounded-circle p-3"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterButton('all') }
          >
            <img src={ allIcon } alt="botão All" style={ { width: '28px' } } />
          </button>
          <p className="mt-1 fw-semibold">All</p>
        </div>

        <div>
          <button
            className="btn btn-outline-warning rounded-circle p-3"
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilterButton('meal') }
          >
            <img src={ mealsIcon } alt="botão de comidas" style={ { width: '28px' } } />
          </button>
          <p className="mt-1 fw-semibold">Food</p>
        </div>

        <div>
          <button
            className="btn btn-outline-warning rounded-circle p-3"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilterButton('drink') }
          >
            <img src={ drinksIcon } alt="botão de bebidas" style={ { width: '28px' } } />
          </button>
          <p className="mt-1 fw-semibold">Drinks</p>
        </div>
      </div>

      <div className="d-flex flex-column gap-3 mt-3">
        {filteredDoneRecipes.map((recipe, index) => (recipe.type === 'meal' ? (
          <DoneRecipeMealCard recipe={ recipe } index={ index } key={ recipe.id } />
        ) : (
          <DoneRecipeDrinkCard recipe={ recipe } index={ index } key={ recipe.id } />
        )))}
      </div>
    </div>
  );
}

export default DoneRecipes;
