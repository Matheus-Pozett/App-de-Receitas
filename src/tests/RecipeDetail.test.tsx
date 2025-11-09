import { vi } from 'vitest/dist/index.js';
import { screen, waitFor } from '@testing-library/react';
import * as api from '../services/api';
import { mealsMock } from './mocks/meals.mock';
import { renderWithRouter } from './renderWithRouter';
import App from '../App';
import { drinksMock } from './mocks/drinks.mock';

const MEALS_URL = '/meals/53086';

describe('Testes da pagina de detalhe da receita', () => {
  afterEach(() => vi.clearAllMocks());

  test('Realiza uma request para a API de comidas passando o ID da receita que deve estar disponível nos parâmetros da URL', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);

    renderWithRouter(<App />, { route: MEALS_URL });

    await waitFor(() => expect(api.fetchMealsById).toBeCalledWith('53086'));
  });

  test('Realiza uma request para a API de bebidas passando o ID da receita que deve estar disponível nos parâmetros da URL', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);

    renderWithRouter(<App />, { route: '/drinks/178349' });

    await waitFor(() => expect(api.fetchDrinksById).toBeCalledWith('178349'));
  });

  test('A tela de comida contem uma imagem da receita, um título, a categoria da receita, uma lista de ingredientes, um vídeo do YouTube incorporado e recomendações', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);

    renderWithRouter(<App />, { route: MEALS_URL });

    const imgRecipe = await screen.findByTestId('recipe-photo');
    const titleRecipe = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredientRecipe = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const videoRecipe = await screen.findByTestId('video');
    const recommendations = await screen.findByTestId('0-recommendation-card');

    expect(titleRecipe).toHaveTextContent(/migas/i);
    expect(imgRecipe).toBeInTheDocument();
    expect(category).toHaveTextContent(/Miscellaneous/i);
    expect(ingredientRecipe).toHaveTextContent(/bread/i);
    expect(instructions).toBeInTheDocument();
    expect(videoRecipe).toBeInTheDocument();
    expect(recommendations).toBeInTheDocument();
  });

  test('A tela de bebida contem uma imagem da receita, um título, se é ou não alcoólica, uma lista de ingredientes e recomendações', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);

    renderWithRouter(<App />, { route: '/drinks/178349' });

    const imgRecipe = await screen.findByTestId('recipe-photo');
    const titleRecipe = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredientRecipe = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const recommendations = await screen.findByTestId('0-recommendation-card');

    expect(titleRecipe).toHaveTextContent(/Snowday/i);
    expect(imgRecipe).toBeInTheDocument();
    expect(category).toHaveTextContent(/Alcoholic/i);
    expect(ingredientRecipe).toHaveTextContent(/Vodka/i);
    expect(instructions).toBeInTheDocument();
    expect(recommendations).toBeInTheDocument();
  });

  test('Testa se o botão Start Recipe está presente na tela e se é fixed', async () => {
    renderWithRouter(<App />, { route: MEALS_URL });
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent(/Start Recipe/i);
    expect(startRecipeBtn).toHaveStyle('position: fixed');
  });
});
