/* eslint-disable max-len */
import { useState, useEffect } from 'react'; // 1. Importe o useEffect
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { MealDetailsAPI } from '../../types';

type MealsInProgressProps = {
  recipe: MealDetailsAPI
};

function MealsInProgress({ recipe }: MealsInProgressProps) {
  const { idMeal } = recipe;

  const ingredientsList = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const ingredientNumber = key.replace('strIngredient', '');
      const measure = recipe[`strMeasure${ingredientNumber}` as keyof MealDetailsAPI];
      return { ingredient: value, measure };
    });

  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );
    if (inProgressRecipes.meals && inProgressRecipes.meals[idMeal]) {
      setCheckedIngredients(inProgressRecipes.meals[idMeal]);
    }
  }, [idMeal]);

  const handleCheckboxChange = (ingredientName: string) => {
    let updatedChecked: string[];
    if (checkedIngredients.includes(ingredientName)) {
      updatedChecked = checkedIngredients.filter((item) => item !== ingredientName);
    } else {
      updatedChecked = [...checkedIngredients, ingredientName];
    }
    setCheckedIngredients(updatedChecked);

    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );
    const updatedInProgress = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [idMeal]: updatedChecked,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgress));
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ `foto da receita ${recipe.strMeal}` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <div className="position-absolute top-0 end-0 d-flex gap-2 p-2">
        <button
          data-testid="share-btn"
          className="btn btn-light p-2 rounded-circle"
          aria-label="share"
        >
          <img src={ shareIcon } alt="compartilhar" style={ { width: '20px' } } />
        </button>
        <button
          className="btn btn-light p-2 rounded-circle"
          aria-label="favorite"
        >
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="favoritar"
            style={ { width: '20px' } }
          />
        </button>
      </div>

      <h3>Ingredients</h3>
      {ingredientsList.map((item, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: checkedIngredients.includes(item.ingredient as string)
              ? 'line-through solid rgb(0, 0, 0)'
              : 'none',
          } }
        >
          <input
            type="checkbox"
            checked={ checkedIngredients.includes(item.ingredient as string) }
            onChange={ () => handleCheckboxChange(item.ingredient as string) }
          />
          {`${item.ingredient} - ${item.measure}`}
        </label>
      ))}

      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default MealsInProgress;
