import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDrinksByFirstLetter, getDrinksByIngredient, getDrinksByName,
  getMealsByFirstLetter, getMealsByIngredient, getMealsByName } from '../../services/api';

type SearchBarProps = {
  inputValue: string
};

type SearchOptions = 'ingredient' | 'name' | 'first-letter';

function SearchBar({ inputValue }: SearchBarProps) {
  const [searchOption, setSearchOption] = useState<SearchOptions>('ingredient');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(event.target.value as SearchOptions);
  };

  const handleClick = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchOption === 'first-letter' && inputValue.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }

    const apiFunctions = pathname === '/meals'
      ? {
        ingredient: getMealsByIngredient,
        name: getMealsByName,
        'first-letter': getMealsByFirstLetter,
      }
      : {
        ingredient: getDrinksByIngredient,
        name: getDrinksByName,
        'first-letter': getDrinksByFirstLetter,
      };

    const searchFunction = apiFunctions[searchOption];
    const results = await searchFunction(inputValue);

    if (results === null || results === 'no data found') {
      window.alert("Sorry, we haven't found any recipes for these filters");
      return;
    }

    if (results.length === 1) {
      const id = pathname === '/meals' ? results[0].idMeal : results[0].idDrink;
      navigate(`${pathname}/${id}`);
    } else {
      console.log(results);
    }
  };

  return (
    <form onSubmit={ handleClick }>
      <input
        type="radio"
        name="search-option"
        data-testid="ingredient-search-radio"
        value="ingredient"
        checked={ searchOption === 'ingredient' }
        onChange={ handleChange }
      />
      <label htmlFor="search-option">Ingredient</label>
      <input
        type="radio"
        name="search-option"
        data-testid="name-search-radio"
        value="name"
        checked={ searchOption === 'name' }
        onChange={ handleChange }
      />
      <label htmlFor="search-option">Name</label>
      <input
        type="radio"
        name="search-option"
        data-testid="first-letter-search-radio"
        value="first-letter"
        checked={ searchOption === 'first-letter' }
        onChange={ handleChange }
      />
      <label htmlFor="search-option">First Letter</label>
      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export { SearchBar };
