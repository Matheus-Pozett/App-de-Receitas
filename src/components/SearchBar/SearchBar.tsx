import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealByIngredient } from '../../services/api';
import { useRecipes } from '../../context/RecipesContext';
import { Recipe } from '../../types';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radio, setRadio] = useState('');
  const { setRecipes } = useRecipes();

  const { pathname } = useLocation();

  const handleSearch = async () => {
    if (pathname === '/meals') {
      try {
        switch (radio) {
          case 'ingredient': {
            const searchIngredient = await getMealByIngredient(inputValue);
            setRecipes(searchIngredient as Recipe[]);
            break;
          }
          case 'name':
            const 
            break;
          case 'first':
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
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
