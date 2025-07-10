import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinksById } from '../../services/api';

function DrinkDetail() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          setRecipe(await getDrinksById(id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [id]);
  return (
    <div>DrinkDetail</div>
  );
}

export { DrinkDetail };
