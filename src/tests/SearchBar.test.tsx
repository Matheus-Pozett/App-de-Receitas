import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest/dist/index.js';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';
import mealsByIngredient from './mocks/mealsByIngredient.mock';
import * as api from '../services/api';
import { mealsByName, mealsNotFoundRecipes } from './mocks/mealsByName.mock';
import { mealsFirstLetter } from './mocks/mealsFirstLetter.mock';
import { oneMealMock } from './mocks/oneMeal.mock';
import { oneDrinkMock } from './mocks/oneDrinks.mock';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_BTN = 'exec-search-btn';
const SEARCH_INGREDIENT_RADIO = 'ingredient-search-radio';
const SEARCH_NAME_RADIO = 'name-search-radio';
const SEARCH_FIRST_LETTER_RADIO = 'first-letter-search-radio';

describe('Testes do SearchBar', () => {
  afterEach(() => vi.clearAllMocks());

  test('Verifica se elementos da barra de busca estão na tela', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const ingredientRadio = screen.getByTestId(SEARCH_INGREDIENT_RADIO);
    const nameRadio = screen.getByTestId(SEARCH_NAME_RADIO);
    const firstLetterRadio = screen.getByTestId(SEARCH_FIRST_LETTER_RADIO);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Teste se ao clicar no radio Ingrediente faz busca no endpoint correto', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    vi.spyOn(api, 'getMealByIngredient').mockResolvedValue(mealsByIngredient.meals);

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const ingredientRadio = screen.getByTestId(SEARCH_INGREDIENT_RADIO);

    await user.click(ingredientRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'chicken_breast');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    expect(api.getMealByIngredient).toHaveBeenCalledWith('chicken_breast');
  });

  test('Teste se ao clicar no radio Name faz busca no endpoint correto', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsByName.meals);

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const nameRadio = screen.getByTestId(SEARCH_NAME_RADIO);

    await user.click(nameRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'beans');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    expect(api.getMealByName).toHaveBeenCalledWith('beans');
  });

  test('Teste se ao clicar no radio FirstLetter faz busca no endpoint correto', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    vi.spyOn(api, 'getMealByFirstLetter').mockResolvedValue(mealsFirstLetter.meals);

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const firstLetterRadio = screen.getByTestId(SEARCH_FIRST_LETTER_RADIO);

    await user.click(firstLetterRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'a');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    expect(api.getMealByFirstLetter).toHaveBeenCalledWith('a');
  });

  test('Verifica se busca por firstLetter mostra alert ao digitar mais de uma letra', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const firstLetterRadio = screen.getByTestId(SEARCH_FIRST_LETTER_RADIO);

    await user.click(firstLetterRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'aa');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Exibe um alert caso nenhuma receita seja encontrada', async () => {
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsNotFoundRecipes.meals as any);
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const nameRadio = screen.getByTestId(SEARCH_NAME_RADIO);

    await user.click(nameRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'matheus');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    expect(api.getMealByName).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters");
  });

  test('Redireciona para a página de detalhes se apenas uma comida for encontrada', async () => {
    vi.spyOn(api, 'getMealByName').mockResolvedValue(oneMealMock);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const nameRadio = screen.getByTestId(SEARCH_NAME_RADIO);

    await user.click(nameRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'corba');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52977');
    });
  });

  test('Redireciona para a página de detalhes se apenas uma bebida for encontrada', async () => {
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(oneDrinkMock);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchHeaderBtn = screen.getByTestId(SEARCH_TOP_BTN);

    await user.click(searchHeaderBtn);

    const nameRadio = screen.getByTestId(SEARCH_NAME_RADIO);

    await user.click(nameRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    await user.type(searchInput, 'avalon');

    const searchBtn = screen.getByTestId(SEARCH_BTN);
    await user.click(searchBtn);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/15266');
    });
  });

  test('', async () => {

  });
});
