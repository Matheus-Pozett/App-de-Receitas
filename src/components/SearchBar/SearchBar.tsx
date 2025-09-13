import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
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
  MealSummary } from '../../types';

const NOT_FOUND_MESSAGE = "Sorry, we haven't found any recipes for these filters";

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radio, setRadio] = useState('');
  const { setRecipes } = useRecipes();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // --- mesma lógica original ---
  const searchMeals = async () => {
    switch (radio) {
      case 'ingredient': {
        const searchIngredient = await getMealByIngredient(inputValue);
        if (searchIngredient.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchIngredient.length === 1) {
          const { idMeal } = searchIngredient[0] as MealSummary;
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
        const searchIngredient = await getDrinksByIngredient(inputValue);
        if (searchIngredient.length === 0) {
          alert(NOT_FOUND_MESSAGE);
        } else if (searchIngredient.length === 1) {
          const { idDrink } = searchIngredient[0] as DrinksSummary;
          navigate(`/drinks/${idDrink}`);
        } else {
          setRecipes(searchIngredient);
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
    <Container
      fluid
      className="p-3"
      style={ { backgroundColor: '#4B0082',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px' } }
    >
      <Form.Control
        type="text"
        placeholder="Search"
        aria-label="Pesquisar"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
        className="mb-3"
        style={ { borderRadius: '8px' } }
      />

      <div className="d-flex justify-content-around mb-3">
        <Form.Check
          inline
          type="radio"
          id="ingredient"
          label="Ingredient"
          value="ingredient"
          checked={ radio === 'ingredient' }
          onChange={ (e) => setRadio(e.target.value) }
          data-testid="ingredient-search-radio"
          style={ { color: 'white' } }
        />
        <Form.Check
          inline
          type="radio"
          id="name"
          label="Name"
          value="name"
          checked={ radio === 'name' }
          onChange={ (e) => setRadio(e.target.value) }
          data-testid="name-search-radio"
          style={ { color: 'white' } }
        />
        <Form.Check
          inline
          type="radio"
          id="first-letter"
          label="First letter"
          value="first"
          checked={ radio === 'first' }
          onChange={ (e) => setRadio(e.target.value) }
          data-testid="first-letter-search-radio"
          style={ { color: 'white' } }
        />
      </div>

      <Button
        variant="warning"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
        className="w-100 fw-bold"
        style={ { color: '#4B0082' } }
      >
        SEARCH
      </Button>
    </Container>
  );
}

export { SearchBar };
