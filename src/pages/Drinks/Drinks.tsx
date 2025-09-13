import { useRecipes } from '../../context/RecipesContext';
import { isDrink } from '../../types/typeGuards';

function Drinks() {
  const { recipes } = useRecipes();

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
