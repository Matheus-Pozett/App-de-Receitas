import { useState } from 'react';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radio, setRadio] = useState('');

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
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export { SearchBar };
