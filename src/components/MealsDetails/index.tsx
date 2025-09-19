/* eslint-disable max-len */
import { DrinkDetailsType, MealDetailsAPI } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type MealsDetailsProps = {
  recipeDetail: MealDetailsAPI;
  recommendations: DrinkDetailsType[];
  handleStartRecipe: () => void;
  handleShare: () => void;
  isLinkCopied: boolean;
  handleFavorite: () => void;
  isFavorite: boolean;
};

function MealsDetails(
  { recipeDetail,
    recommendations,
    handleStartRecipe,
    handleShare,
    isLinkCopied,
    handleFavorite,
    isFavorite,
  }: MealsDetailsProps,
) {
  const ingredientsList = Object.entries(recipeDetail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const ingredientNumber = key.replace('strIngredient', '');
      const measure = recipeDetail[`strMeasure${ingredientNumber}` as keyof MealDetailsAPI];
      return { ingredient: value, measure };
    });

  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container pb-5" style={ { paddingBottom: '120px' } }>
      <div className="position-relative w-100">
        <img
          src={ recipeDetail.strMealThumb }
          alt={ `foto da receita ${recipeDetail.strMeal}` }
          data-testid="recipe-photo"
          className="w-100"
          style={ {
            height: '162px',
            objectFit: 'cover',
          } }
        />
        <h1
          data-testid="recipe-title"
          className="position-absolute top-50 start-50 translate-middle text-white fw-bold text-center"
          style={ { fontSize: '1.5rem', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' } }
        >
          {recipeDetail.strMeal}
        </h1>

        <div className="position-absolute top-0 end-0 d-flex gap-2 p-2">
          <button
            data-testid="share-btn"
            onClick={ handleShare }
            className="btn btn-light p-2 rounded-circle"
            aria-label="share"
          >
            <img src={ shareIcon } alt="compartilhar" style={ { width: '20px' } } />
          </button>
          <button
            onClick={ handleFavorite }
            className="btn btn-light p-2 rounded-circle"
            aria-label="favorite"
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favoritar"
              style={ { width: '20px' } }
            />
          </button>
        </div>
      </div>

      {isLinkCopied && <p className="mt-2 text-success">Link copied!</p>}

      <p data-testid="recipe-category" className="mt-2 fw-semibold text-secondary">
        {recipeDetail.strCategory}
      </p>

      <h2 className="mt-4 fw-bold">Ingredients</h2>
      <ul className="list-group mb-3">
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
            className="list-group-item"
          >
            {`${item.ingredient} - ${item.measure}`}
          </li>
        ))}
      </ul>

      <h2 className="fw-bold">Instructions</h2>
      <div className="card card-body mb-4">
        <p data-testid="instructions" className="mb-0" style={ { whiteSpace: 'pre-line' } }>
          {recipeDetail.strInstructions}
        </p>
      </div>

      <h2 className="fw-bold">Video</h2>
      <div className="ratio ratio-16x9 mb-4">
        <iframe
          data-testid="video"
          src={ getYoutubeEmbedUrl(recipeDetail.strYoutube) }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <h2 className="fw-bold">Recommended</h2>
      <div
        className="d-flex mb-4"
        style={ {
          overflowX: 'auto',
          gap: '1rem',
          scrollSnapType: 'x mandatory',
        } }
      >
        {recommendations.slice(0, 6).map((r, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ r.idDrink }
            className="card flex-shrink-0"
            style={ {
              width: '50%',
              scrollSnapAlign: 'start',
            } }
          >
            <img
              src={ r.strDrinkThumb }
              alt={ `imagem da bebida ${r.strDrink}` }
              className="card-img-top"
            />
            <div className="card-body p-2 text-center">
              <p
                data-testid={ `${index}-recommendation-title` }
                className="card-title fw-medium mb-0"
              >
                {r.strDrink}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        data-testid="start-recipe-btn"
        className="btn btn-warning fw-bold text-white py-3"
        onClick={ handleStartRecipe }
        style={ {
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1050,
          boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
        } }
      >
        START RECIPE
      </button>
    </div>
  );
}

export default MealsDetails;
