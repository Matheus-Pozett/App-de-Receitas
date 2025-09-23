/* eslint-disable max-len */
import { MealDetailsAPI } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type MealsInProgressProps = {
  recipe: MealDetailsAPI;
  checkedIngredients: string[];
  handleCheckboxChange: (ingredient: string) => void;
  handleFinishRecipe: () => void;
  isFavorite: boolean;
  handleFavorite: () => void;
  isLinkCopied: boolean;
  handleShare: () => void;
};

function MealsInProgress(props: MealsInProgressProps) {
  const {
    recipe,
    checkedIngredients,
    handleCheckboxChange,
    handleFinishRecipe,
    isFavorite,
    handleFavorite,
    isLinkCopied,
    handleShare,
  } = props;

  const ingredientsList = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const number = key.replace('strIngredient', '');
      return `${value} - ${recipe[`strMeasure${number}` as keyof typeof recipe] || ''}`.trim();
    });

  const isFinishDisabled = checkedIngredients.length !== ingredientsList.length;

  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container pb-5">
      <div className="position-relative w-100">
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          className="w-100"
          style={ { height: '162px', objectFit: 'cover' } }
        />

        <h1
          data-testid="recipe-title"
          className="position-absolute top-50 start-50 translate-middle text-white fw-bold text-center"
          style={ { fontSize: '1.5rem', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' } }
        >
          {recipe.strMeal}
        </h1>

        <div className="position-absolute top-0 end-0 d-flex gap-2 m-2">
          <button
            onClick={ handleShare }
            className="btn btn-light p-2 rounded-circle"
          >
            <img src={ shareIcon } alt="Share" data-testid="share-btn" />
          </button>

          <button
            onClick={ handleFavorite }
            className="btn btn-light p-2 rounded-circle"
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>

      {isLinkCopied && <p className="text-success small mt-1">Link copied!</p>}
      <p data-testid="recipe-category" className="mt-2 fw-semibold text-secondary">
        {recipe.strCategory}
      </p>

      <h3 className="fw-bold mt-3">Ingredients</h3>
      <ul className="list-group mb-3">
        {ingredientsList.map((ingredient, index) => (
          <li key={ index } className="list-group-item d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={ checkedIngredients.includes(ingredient) }
              onChange={ () => handleCheckboxChange(ingredient) }
              data-testid={ `${index}-ingredient-step` }
              className="form-check-input"
            />
            <span
              style={ {
                textDecoration: checkedIngredients.includes(ingredient)
                  ? 'line-through solid rgb(0, 0, 0)'
                  : 'none',
              } }
            >
              {ingredient}
            </span>
          </li>
        ))}
      </ul>
      <h3 className="fw-bold">Instructions</h3>
      <div className="card card-body mb-4">
        <p
          data-testid="instructions"
          className="mb-0"
          style={ { whiteSpace: 'pre-line' } }
        >
          {recipe.strInstructions}
        </p>
      </div>

      <h3 className="fw-bold">Video</h3>
      <div className="ratio ratio-16x9 mb-5">
        <iframe
          data-testid="video"
          src={ getYoutubeEmbedUrl(recipe.strYoutube) }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="d-grid">
        <button
          data-testid="finish-recipe-btn"
          disabled={ isFinishDisabled }
          onClick={ handleFinishRecipe }
          className="btn btn-warning fw-bold text-white py-3"
          style={ {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            borderRadius: '0',
          } }
        >
          FINISH RECIPE
        </button>
      </div>
    </div>
  );
}

export default MealsInProgress;
