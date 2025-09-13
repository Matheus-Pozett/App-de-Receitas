import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getMealByFirstLetter,
  getMealByIngredient,
  getMealByName } from '../../services/api';
import { useRecipes } from '../../context/RecipesContext';
import { DrinkDetailsType,
  DrinksSummary,
  MealDetailsAPI,
  MealsIngredientType } from '../../types';

const NOT_FOUND_MESSAGE = "Sorry, we haven't found any recipes for these filters";

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radio, setRadio] = useState('');
  const { setRecipes } = useRecipes();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const searchMeals = async () => {
    switch (radio) {
      case 'ingredient': {
        const searchIngredient = await getMealByIngredient(inputValue);
        if (searchIngredient.length === 0) {
          alert();
        } else if (searchIngredient.length === 1) {
          const { idMeal } = searchIngredient[0] as MealsIngredientType;
          navigate(`/meals/${idMeal}`);
        } else {
          setRecipes(searchIngredient);
        }
        break;
      }
      case 'name': {
        const searchName = await getMealByName(inputValue);
        if (searchName.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchName.length === 1) {
          const { idMeal } = searchName[0] as MealDetailsAPI;
          navigate(`/meals/${idMeal}`);
        } else {
          setRecipes(searchName);
        }
        break;
      }
      case 'first': {
        if (inputValue.length !== 1) {
          alert('Your search must have only 1 (one) character');
          break;
        }
        const searchFirstName = await getMealByFirstLetter(inputValue);

        if (searchFirstName.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchFirstName.length === 1) {
          const { idMeal } = searchFirstName[0] as MealDetailsAPI;
          navigate(`/meals/${idMeal}`);
        } else {
          setRecipes(searchFirstName);
        }
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
        if (searchIngedrient.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchIngedrient.length === 1) {
          const { idDrink } = searchIngedrient[0] as DrinksSummary;
          navigate(`/drinks/${idDrink}`);
        } else {
          setRecipes(searchIngedrient);
        }
        break;
      }
      case 'name': {
        const searchName = await getDrinksByName(inputValue);
        if (searchName.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchName.length === 1) {
          const { idDrink } = searchName[0] as DrinkDetailsType;
          navigate(`/drinks/${idDrink}`);
        } else {
          setRecipes(searchName);
        }
        break;
      }
      case 'first': {
        if (inputValue.length !== 1) {
          alert('Your search must have only 1 (one) character');
          break;
        }
        const searchFirstLetter = await getDrinksByFirstLetter(inputValue);

        if (searchFirstLetter.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchFirstLetter.length === 1) {
          const { idDrink } = searchFirstLetter[0] as DrinkDetailsType;
          navigate(`/drinks/${idDrink}`);
        } else {
          setRecipes(searchFirstLetter);
        }
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
