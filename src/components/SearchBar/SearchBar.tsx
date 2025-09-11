import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getMealByFirstLetter,
  getMealByIngredient,
  getMealByName } from '../../services/api';
import { useRecipes } from '../../context/RecipesContext';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radio, setRadio] = useState('');
  const { setRecipes } = useRecipes();
  const { pathname } = useLocation();

  const searchMeals = async () => {
    switch (radio) {
      case 'ingredient': {
        const searchIngredient = await getMealByIngredient(inputValue);
        setRecipes(searchIngredient);
        break;
      }
      case 'name': {
        const searchName = await getMealByName(inputValue);
        setRecipes(searchName);
        break;
      }
      case 'first': {
        if (inputValue.length !== 1) {
          alert('Your search must have only 1 (one) character');
          break;
        }
        const searchFirstName = await getMealByFirstLetter(inputValue);
        setRecipes(searchFirstName);
      }
        break;
      default:
        break;
    }
  };

  const searchDrinks = async () => {
    switch (radio) {
      case 'ingredient': {
        const searchIngedrient = await getDrinksByIngredient(inputValue);
        setRecipes(searchIngedrient);
        break;
      }
      case 'name': {
        const searchName = await getDrinksByName(inputValue);
        setRecipes(searchName);
        break;
      }
      case 'first': {
        if (inputValue.length !== 1) {
          alert('Your search must have only 1 (one) character');
          break;
        }
        const searchFirstLetter = await getDrinksByFirstLetter(inputValue);
        setRecipes(searchFirstLetter);
        break;
      }
      default:
        break;
    }
  };

  const handleSearch = () => {
    if (pathname === '/meals') {
      searchMeals();
    } else {
      searchDrinks();
    }
  };

  return (
    <div>
      <input
        aria-label="Pesquisar"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />
      <div>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="radio-search"
          value="ingredient"
          checked={ radio === 'ingredient' }
          onChange={ (e) => setRadio(e.target.value) }
        />
        <label htmlFor="ingredient">Ingredient</label>
      </div>
      <div>
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="radio-search"
          value="name"
          checked={ radio === 'name' }
          onChange={ (e) => setRadio(e.target.value) }
        />
        <label htmlFor="name">Name</label>
      </div>
      <div>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="radio-search"
          value="first"
          checked={ radio === 'first' }
          onChange={ (e) => setRadio(e.target.value) }
        />
        <label htmlFor="first-letter">First letter</label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

export { SearchBar };
