import { vi } from 'vitest/dist/index.js';
import * as api from '../services/api';
import { mealsMock } from './mocks/meals.mock';
import { renderWithRouter } from './renderWithRouter';
import App from '../App';
import { drinksMock } from './mocks/drinks.mock';

describe('Testes da pagina de detalhe da receita', () => {
  afterEach(() => vi.clearAllMocks());

  test('Realiza uma request para a API de comidas passando o ID da receita que deve estar disponível nos parâmetros da URL', () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);

    renderWithRouter(<App />, { route: '/meals/53086' });

    expect(api.fetchMealsById).toBeCalledWith('53086');
  });

  test('Realiza uma request para a API de bebidas passando o ID da receita que deve estar disponível nos parâmetros da URL', () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);

    renderWithRouter(<App />, { route: '/drinks/178349' });

    expect(api.fetchDrinksById).toBeCalledWith('178349');
  });
});
