import DrinkFavoriteCard from '../../components/DrinkFavoriteCard';
import MealFavoriteCard from '../../components/MealFavoriteCard';
import { useFavorites } from '../../context/FavoritesContext';

function FavoriteRecipes() {
  const { favorites } = useFavorites();
  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {favorites.map((fav, index) => {
          if (fav.type === 'meal') {
            return <MealFavoriteCard fav={ fav } index={ index } key={ fav.id } />;
          }
          return <DrinkFavoriteCard fav={ fav } index={ index } key={ fav.id } />;
        })}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
