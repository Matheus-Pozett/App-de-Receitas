import { vi } from 'vitest/dist/index.js';
import { screen, waitFor } from '@testing-library/dom';
import * as api from '../services/api';
import { mealsMock } from './mocks/meals.mock';
import { renderWithRouter } from './renderWithRouter';
import App from '../App';
import { drinksMock } from './mocks/drinks.mock';
import { mealsCategories } from './mocks/mealsCategory.mock';
import { drinksCategoriesMock } from './mocks/drinksCategory.mock';
import { categoryBeefMock } from './mocks/mealFilteredBeefMock.mock';
import { categoryByCocktailMock } from './mocks/drinkFilteredCocktail.mock';

describe('Testes da pagina de receitas', () => {
  afterEach(() => vi.clearAllMocks());

  test('Carrega as 12 primeiras receitas de comidas na tela', async () => {
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock);

    renderWithRouter(<App />, { route: '/meals' });

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    const imgs = await screen.findAllByTestId(/card-img/i);
    const nameCards = await screen.findAllByTestId(/card-name/i);

    expect(api.getMealByName).toHaveBeenCalledWith('');
    expect(recipeCards).toHaveLength(12);
    expect(imgs).toHaveLength(12);
    expect(nameCards).toHaveLength(12);
  });

  test('Carrega as 12 primeiras receitas de bebidas na tela', async () => {
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock);

    renderWithRouter(<App />, { route: '/drinks' });

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    const imgs = await screen.findAllByTestId(/card-img/i);
    const nameCards = await screen.findAllByTestId(/card-name/i);

    expect(api.getDrinksByName).toHaveBeenCalledWith('w');
    expect(recipeCards).toHaveLength(12);
    expect(imgs).toHaveLength(12);
    expect(nameCards).toHaveLength(12);
  });

  test('Exibe as 5 categorias de comidas', async () => {
    vi.spyOn(api, 'getMealsCategories').mockResolvedValue(mealsCategories);

    renderWithRouter(<App />, { route: '/meals' });

    expect(await screen.findByText(/Goat/i)).toBeInTheDocument();

    const categoryCards = await screen.findAllByTestId(/category-filter/i);

    expect(api.getMealsCategories).toHaveBeenCalled();
    expect(await screen.findByText(/All/i)).toBeInTheDocument();
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
    expect(await screen.findByText(/breakfast/i)).toBeInTheDocument();
    expect(await screen.findByText(/chicken/i)).toBeInTheDocument();
    expect(await screen.findByText(/dessert/i)).toBeInTheDocument();
    expect(await screen.findByText(/goat/i)).toBeInTheDocument();
    expect(categoryCards).toHaveLength(6);
  });

  test('Exibe as 5 categorias de bebidas', async () => {
    vi.spyOn(api, 'getDrinksCategories').mockResolvedValue(drinksCategoriesMock);

    renderWithRouter(<App />, { route: '/drinks' });

    expect(await screen.findByText(/Cocktail/i)).toBeInTheDocument();

    const categoryCards = await screen.findAllByTestId(/category-filter/i);

    expect(api.getDrinksCategories).toHaveBeenCalled();
    expect(await screen.findByText(/Cocktail/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ordinary Drink/i)).toBeInTheDocument();
    expect(await screen.findByText(/Party Drink/i)).toBeInTheDocument();
    expect(await screen.findByText(/Shake/i)).toBeInTheDocument();
    expect(await screen.findByText(/Other/i)).toBeInTheDocument();
    expect(categoryCards).toHaveLength(6);
  });

  test('Redireciona para a tela de detalhes da comida quando clicar no card', async () => {
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const card = await screen.findByText(/migas/i);

    await user.click(card);

    expect(window.location.pathname).toBe('/meals/53086');
  });

  test('Redireciona para a tela de detalhes da bebida quando clicar no card', async () => {
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const card = await screen.findByText(/snowday/i);

    await user.click(card);

    expect(window.location.pathname).toBe('/drinks/178349');
  });

  test('Implementa o filtro como um toggle na rota /meals', async () => {
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const beefBtn = await screen.findByRole('button', { name: /beef/i });

    expect(beefBtn).toBeInTheDocument();

    await user.click(beefBtn);

    expect(await screen.findByText(/beef and mustard pie/i)).toBeInTheDocument();

    await user.click(beefBtn);

    expect(await screen.findByText(/migas/i)).toBeInTheDocument();
  });

  test('Implementa o filtro como um toggle na rota /drinks', async () => {
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const cocktail = await screen.findByRole('button', { name: /cocktail/i });

    expect(cocktail).toBeInTheDocument();

    await user.click(cocktail);

    expect(await screen.findByText(/155 belmont/i)).toBeInTheDocument();

    await user.click(cocktail);

    expect(await screen.findByText(/snowday/i)).toBeInTheDocument();
  });

  test('Filtra as comidas corretamente ao clicar na categoria "Beef"', async () => {
    vi.spyOn(api, 'getMealsCategories').mockResolvedValue(mealsCategories);
    vi.spyOn(api, 'filterMealByCategory').mockResolvedValue(categoryBeefMock);

    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const beefCategoryButton = await screen.findByRole('button', { name: /beef/i });
    await user.click(beefCategoryButton);

    expect(api.filterMealByCategory).toHaveBeenCalledWith('Beef');
    await waitFor(() => {
      expect(screen.getByText('Beef and Mustard Pie')).toBeInTheDocument();
    });
  });

  test('Filtra as comidas corretamente ao clicar na categoria "Cocktail"', async () => {
    vi.spyOn(api, 'getDrinksCategories').mockResolvedValue(drinksCategoriesMock);
    vi.spyOn(api, 'filterDrinkByCategory').mockResolvedValue(categoryByCocktailMock);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const cocktailCategoryButton = await screen.findByRole('button', { name: /Cocktail/i });
    await user.click(cocktailCategoryButton);

    expect(api.filterDrinkByCategory).toHaveBeenCalledWith('Cocktail');

    const filteredDrink = await screen.findByText(/747 drink/i);
    expect(filteredDrink).toBeInTheDocument();
  });

  test('Lida corretamente com um erro ao buscar as categorias de comidas', async () => {
    vi.spyOn(api, 'getMealsCategories').mockRejectedValue(new Error('API is down'));
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithRouter(<App />, { route: '/meals' });
    expect(api.getMealsCategories).toHaveBeenCalled();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('API is down'));
    });
    consoleErrorSpy.mockRestore();
  });
});
