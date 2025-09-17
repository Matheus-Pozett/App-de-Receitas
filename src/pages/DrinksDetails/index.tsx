/* eslint-disable max-len */
import { DrinkDetailsType } from '../../types';

type DrinksDetailsProps = {
  recipeDetail: DrinkDetailsType
};

function DrinksDetails({ recipeDetail } : DrinksDetailsProps) {
  const ingredientsList = Object.entries(recipeDetail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const ingredientNumber = key.replace('strIngredient', '');
      const measure = recipeDetail[`strMeasure${ingredientNumber}` as keyof DrinkDetailsType];
      return { ingredient: value, measure };
    });

  return (
    <div>
      <img
        src={ recipeDetail.strDrinkThumb }
        alt={ `Foto da receita ${recipeDetail.strDrink}` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipeDetail.strDrink}</h1>
      <p data-testid="recipe-category">{recipeDetail.strAlcoholic}</p>
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
    </div>
  );
}

export default DrinksDetails;
