import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MealsType, OutletContextType } from '../../types';

type MealsProps = {
  recipes: MealsType[];
};

function Meals({ recipes }: MealsProps) {
  const { setTitle } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  return (
    <div>
      {recipes.slice(0, 12).map((recipe, index) => (
        <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strMealThumb }
            alt={ `Foto da receita ${recipe.strMeal}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export { Meals };
