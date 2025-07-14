import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsById } from '../../services/api';
import { RecipeMealType } from '../../types';
import { Loading } from '../../components';

type Ingredient = {
  name: string;
  measure: string;
};

function MealDetail() {
  const [recipe, setRecipe] = useState<RecipeMealType | null>(null);
  const [ingredients, setIngredient] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const data = await getMealsById(id);
          setRecipe(data);
          const ingredientsList: Ingredient[] = [];
          for (let index = 1; index <= 20; index += 1) {
            const ingredientName = data[`strIngredient${index}` as keyof RecipeMealType];
            const measureName = data[`strMeasure${index}` as keyof RecipeMealType];
            if (ingredientName && measureName) {
              ingredientsList.push(
                { name: ingredientName, measure: measureName },
              );
            }
          }
          setIngredient(ingredientsList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div>Receita não encontrada.</div>;
  }

  const videoId = recipe.strYoutube.split('v=')[1];

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ `Foto da receita ${recipe.strMeal}` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {ingredients.map((i, index) => (
        <div key={ index }>
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${i.name} - ${i.measure}`}
          </p>
        </div>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${videoId}` }
        title="Título do Vídeo para Acessibilidade"
        data-testid="video"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export { MealDetail };
