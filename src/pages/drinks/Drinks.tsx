import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DrinksType, OutletContextType } from '../../types';

type DrinksProps = {
  recipes: DrinksType[];
};

function Drinks({ recipes }: DrinksProps) {
  const { setTitle } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  return (
    <div>
      {recipes.slice(0, 12).map((recipe, index) => (
        <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strDrinkThumb }
            alt={ `Foto da bebida ${recipe.strDrink}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export { Drinks };
