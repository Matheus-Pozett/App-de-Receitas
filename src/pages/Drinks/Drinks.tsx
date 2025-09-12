import { useEffect } from 'react';
import { useRecipes } from '../../context/RecipesContext';
import { getDrinksByName } from '../../services/api';
import { isDrink } from '../../types/typeGuards';

function Drinks() {
  const { recipes, setRecipes } = useRecipes();

  useEffect(() => {
    const getRecipesDrinks = async () => {
      try {
        const getDrinks = await getDrinksByName('w');
        const drinks = getDrinks.slice(0, 12);
        setRecipes(drinks);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipesDrinks();
  }, [setRecipes]);

  const drinks = recipes.filter(isDrink);

  return (
    <div>
      {drinks.map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ drink.strDrinkThumb }
            alt="imagem da bebida"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export { Drinks };
