import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksByFirstLetter, getDrinksByIngredient, getDrinksByName,
  getMealsByFirstLetter, getMealsByIngredient, getMealsByName } from '../../services/api';

type SearchBarProps = {
  inputValue: string
};

function SearchBar({ inputValue }: SearchBarProps) {
  const [searchOption, setSearchOption] = useState('ingredient');
  const { pathname } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(event.target.value);
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    switch (searchOption) {
      case 'ingredient':
        if (pathname === '/meals') {
          await getMealsByIngredient(inputValue);
        }
        if (pathname === '/drinks') {
          await getDrinksByIngredient(inputValue);
        }
        break;
      case 'name':
        if (pathname === '/meals') {
          await getMealsByName(inputValue);
        }
        if (pathname === '/drinks') {
          await getDrinksByName(inputValue);
        }
        break;
      case 'first-letter':
        if (inputValue.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
        }

        if (pathname === '/meals') {
          await getMealsByFirstLetter(inputValue);
        }
        if (pathname === '/drinks') {
          await getDrinksByFirstLetter(inputValue);
        }
        break;
      default:
        break;
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
