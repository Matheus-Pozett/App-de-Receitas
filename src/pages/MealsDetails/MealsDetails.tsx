/* eslint-disable max-len */
import { MealDetailsAPI } from '../../types';

type MealsDetailsProps = {
  recipeDetail: MealDetailsAPI;
};

function MealsDetails({ recipeDetail }: MealsDetailsProps) {
  const ingredientsList = Object.entries(recipeDetail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const ingredientNumber = key.replace('strIngredient', '');
      const measure = recipeDetail[`strMeasure${ingredientNumber}` as keyof MealDetailsAPI];
      return { ingredient: value, measure };
    });
  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url) {
      return '';
    }
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div>

      <img
        src={ recipeDetail.strMealThumb }
        alt={ `foto da receita ${recipeDetail.strMeal}` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipeDetail.strMeal}</h1>
      <p data-testid="recipe-category">{recipeDetail.strCategory}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item.ingredient} - ${item.measure}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeDetail.strInstructions}</p>

      <iframe
        width="560"
        height="315"
        data-testid="video"
        src={ getYoutubeEmbedUrl(recipeDetail.strYoutube) }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
              picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default MealsDetails;
