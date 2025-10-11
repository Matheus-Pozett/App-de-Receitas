import { useState } from 'react';
import DrinkFavoriteCard from '../../components/DrinkFavoriteCard';
import MealFavoriteCard from '../../components/MealFavoriteCard';
import { useFavorites } from '../../context/FavoritesContext';
import { FavoritesType } from '../../types';
import allIcon from '../../images/allFavoriteIcon.svg';
import mealsIcon from '../../images/icone-prato.svg';
import drinksIcon from '../../images/drinksIcon.svg';

function FavoriteRecipes() {
  const { favorites, handleFavorite } = useFavorites();
  const [filterButton, setFilterButton] = useState('all');

  const handleUnfavorite = (recipe: FavoritesType) => {
    handleFavorite(recipe, recipe.type === 'meal');
  };

  const filteredFavorites = favorites.filter((fav) => {
    if (filterButton === 'all') {
      return true;
    }
    return fav.type === filterButton;
  });

  return (
    <div className="container" style={ { paddingBottom: '100px' } }>
      <div className="d-flex justify-content-center gap-4 my-3 text-center">
        <div>
          <button
            onClick={ () => setFilterButton('all') }
            data-testid="filter-by-all-btn"
            className="btn btn-light rounded-circle d-flex justify-content-center
            align-items-center mx-auto"
            style={ { width: '70px', height: '70px' } }
          >
            <img src={ allIcon } alt="botão All" style={ { width: '28px' } } />
          </button>
          <p className="mt-2 small fw-semibold">All</p>
        </div>

        <div>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilterButton('meal') }
            className="btn btn-light rounded-circle d-flex justify-content-center
            align-items-center mx-auto"
            style={ { width: '70px', height: '70px' } }
          >
            <img src={ mealsIcon } alt="botão de comidas" style={ { width: '28px' } } />
          </button>
          <p className="mt-2 small fw-semibold">Meal</p>
        </div>

        <div>
          <button
            onClick={ () => setFilterButton('drink') }
            data-testid="filter-by-drink-btn"
            className="btn btn-light rounded-circle d-flex justify-content-center
            align-items-center mx-auto"
            style={ { width: '70px', height: '70px' } }
          >
            <img src={ drinksIcon } alt="botão de bebidas" style={ { width: '28px' } } />
          </button>
          <p className="mt-2 small fw-semibold">Drinks</p>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {filteredFavorites.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <p className="fw-semibold">Nenhuma receita foi favoritada ainda 🍳</p>
          </div>
        ) : (
          filteredFavorites.map((fav, index) => (fav.type === 'meal' ? (
            <MealFavoriteCard
              fav={ fav }
              index={ index }
              key={ fav.id }
              handleUnfavorite={ handleUnfavorite }
            />
          ) : (
            <DrinkFavoriteCard
              fav={ fav }
              index={ index }
              key={ fav.id }
              handleUnfavorite={ handleUnfavorite }
            />
          )))
        )}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
