import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsById } from '../../services/api';

function MealDetail() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          setRecipe(await getMealsById(id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <div>MealDetail</div>
  );
}

export { MealDetail };
