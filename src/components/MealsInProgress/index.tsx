import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { MealDetailsAPI } from '../../types';

type MealsInProgressProps = {
  recipe: MealDetailsAPI
};

function MealsInProgress({ recipe }: MealsInProgressProps) {
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
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default MealsInProgress;
