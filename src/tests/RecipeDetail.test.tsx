import { vi } from 'vitest/dist/index.js';
import { screen, waitFor } from '@testing-library/react';
import * as api from '../services/api';
import { mealsMock } from './mocks/meals.mock';
import { renderWithRouter } from './renderWithRouter';
import App from '../App';
import { drinksMock } from './mocks/drinks.mock';

const MEALS_URL = '/meals/53086';
const DRINKS_URL = '/drinks/178349';
const START_RECIPE_BTN_TESTID = 'start-recipe-btn';
const SHARE_BTN_TESTID = 'share-btn';
const FAVORITE_BTN_TESTID = 'favorite-btn';
const LINK_COPIED_MESSAGE = /Link copied!/i;
const originalClipboard = navigator.clipboard;
const FAVORITE_STORAGE_KEY = 'favoriteRecipes';
const WHITE_HEART_PATH = 'whiteHeartIcon.svg';
const BLACK_HEART_PATH = 'blackHeartIcon.svg';
const FAVORITE_MEAL_DATA = {
  id: '53086',
  type: 'meal',
  nationality: 'Spanish',
  category: 'Miscellaneous',
  alcoholicOrNot: '',
  name: 'Migas',
  image: 'https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg',
};

const FAVORITE_DRINK_DATA = {
  id: '178349',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Snowday',
  image: 'https://www.thecocktaildb.com/images/media/drink/4n1ipk1614009624.jpg',
};

const createClipboardSpy = () => {
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
      configurable: true,
    });
  }

  return vi
    .spyOn(navigator.clipboard as NonNullable<Navigator['clipboard']>, 'writeText')
    .mockResolvedValue(undefined);
};

describe('Testes da pagina de detalhe da receita', () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      });
    } else {
      Reflect.deleteProperty(navigator as unknown as Record<string, unknown>, 'clipboard');
    }
  });

  test('Realiza uma request para a API de comidas passando o ID da receita que deve estar disponível nos parâmetros da URL', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);

    renderWithRouter(<App />, { route: MEALS_URL });

    await waitFor(() => expect(api.fetchMealsById).toBeCalledWith('53086'));
  });

  test('Realiza uma request para a API de bebidas passando o ID da receita que deve estar disponível nos parâmetros da URL', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);

    renderWithRouter(<App />, { route: DRINKS_URL });

    await waitFor(() => expect(api.fetchDrinksById).toBeCalledWith('178349'));
  });

  test('A tela de comida contem uma imagem da receita, um título, a categoria da receita, uma lista de ingredientes, um vídeo do YouTube incorporado e recomendações', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    const getDrinksByNameSpy = vi
      .spyOn(api, 'getDrinksByName')
      .mockResolvedValue(drinksMock as never);

    renderWithRouter(<App />, { route: MEALS_URL });

    const imgRecipe = await screen.findByTestId('recipe-photo');
    const titleRecipe = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredientRecipe = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const videoRecipe = await screen.findByTestId('video');
    const recommendationCards = await screen.findAllByTestId(/-recommendation-card$/);
    const carouselContainer = recommendationCards[0].parentElement as HTMLElement;

    expect(titleRecipe).toHaveTextContent(/migas/i);
    expect(imgRecipe).toBeInTheDocument();
    expect(category).toHaveTextContent(/Miscellaneous/i);
    expect(ingredientRecipe).toHaveTextContent(/bread/i);
    expect(instructions).toBeInTheDocument();
    expect(videoRecipe).toBeInTheDocument();
    expect(recommendationCards).toHaveLength(6);
    expect(recommendationCards[0]).toHaveStyle('width: 50%');
    expect(carouselContainer).toHaveStyle('overflow-x: auto');
    await waitFor(() => expect(getDrinksByNameSpy).toHaveBeenCalledWith('w'));
  });

  test('A tela de bebida contem uma imagem da receita, um título, se é ou não alcoólica, uma lista de ingredientes e recomendações', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    const getMealByNameSpy = vi
      .spyOn(api, 'getMealByName')
      .mockResolvedValue(mealsMock as never);

    renderWithRouter(<App />, { route: DRINKS_URL });

    const imgRecipe = await screen.findByTestId('recipe-photo');
    const titleRecipe = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const ingredientRecipe = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const recommendationCards = await screen.findAllByTestId(/-recommendation-card$/);
    const carouselContainer = recommendationCards[0].parentElement as HTMLElement;

    expect(titleRecipe).toHaveTextContent(/Snowday/i);
    expect(imgRecipe).toBeInTheDocument();
    expect(category).toHaveTextContent(/Alcoholic/i);
    expect(ingredientRecipe).toHaveTextContent(/Vodka/i);
    expect(instructions).toBeInTheDocument();
    expect(recommendationCards).toHaveLength(6);
    expect(recommendationCards[0]).toHaveStyle('width: 50%');
    expect(carouselContainer).toHaveStyle('overflow-x: auto');
    await waitFor(() => expect(getMealByNameSpy).toHaveBeenCalledWith(''));
  });

  test('Não renderiza o botão Start Recipe quando a receita já foi concluída', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '53086',
        type: 'meal',
        nationality: 'Spanish',
        category: 'Miscellaneous',
        alcoholicOrNot: '',
        name: 'Migas',
        image: 'https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg',
        doneDate: '2024-01-01',
        tags: [],
      },
    ]));

    renderWithRouter(<App />, { route: MEALS_URL });

    await waitFor(() => expect(api.fetchMealsById).toHaveBeenCalled());

    expect(screen.queryByTestId(START_RECIPE_BTN_TESTID)).not.toBeInTheDocument();
  });

  test('Testa se o botão Start Recipe está presente na tela e se é fixed', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    renderWithRouter(<App />, { route: MEALS_URL });
    const startRecipeBtn = await screen.findByTestId(START_RECIPE_BTN_TESTID);

    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent(/Start Recipe/i);
    expect(startRecipeBtn).toHaveStyle('position: fixed');
  });

  test('Redireciona para a tela de receita em progresso de comida ao clicar em Start Recipe', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    const { user } = renderWithRouter(<App />, { route: MEALS_URL });

    const startRecipeBtn = await screen.findByTestId(START_RECIPE_BTN_TESTID);
    await user.click(startRecipeBtn);

    await waitFor(() => expect(window.location.pathname).toBe('/meals/53086/in-progress'));
  });

  test('Redireciona para a tela de receita em progresso de bebida ao clicar em Start Recipe', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    const { user } = renderWithRouter(<App />, { route: DRINKS_URL });

    const startRecipeBtn = await screen.findByTestId(START_RECIPE_BTN_TESTID);
    await user.click(startRecipeBtn);

    await waitFor(() => expect(window.location.pathname).toBe('/drinks/178349/in-progress'));
  });

  test('Verifica se existe botão de favoritar e compartilhar na tela', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    renderWithRouter(<App />, { route: MEALS_URL });

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });

  test('Copia o link da receita de comida e exibe mensagem ao compartilhar', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    const writeTextSpy = createClipboardSpy();

    const { user } = renderWithRouter(<App />, { route: MEALS_URL });

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    await user.click(shareBtn);

    await waitFor(() => expect(writeTextSpy).toHaveBeenCalledWith('http://localhost:3000/meals/53086'));

    const copiedMessage = await screen.findByText(LINK_COPIED_MESSAGE);
    expect(copiedMessage).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });

  test('Copia o link da receita de bebida e exibe mensagem ao compartilhar', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    const writeTextSpy = createClipboardSpy();

    const { user } = renderWithRouter(<App />, { route: DRINKS_URL });

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    await user.click(shareBtn);

    await waitFor(() => expect(writeTextSpy).toHaveBeenCalledWith('http://localhost:3000/drinks/178349'));

    const copiedMessage = await screen.findByText(LINK_COPIED_MESSAGE);
    expect(copiedMessage).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });

  test('Salva a receita de comida no localStorage ao favoritar', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    const { user } = renderWithRouter(<App />, { route: MEALS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);
    await user.click(favoriteBtn);

    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([FAVORITE_MEAL_DATA]);
    });
  });

  test('Salva a receita de bebida no localStorage ao favoritar', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    const { user } = renderWithRouter(<App />, { route: DRINKS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);
    await user.click(favoriteBtn);

    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([FAVORITE_DRINK_DATA]);
    });
  });

  test('Exibe ícone do coração vazio para comida não favoritada', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    renderWithRouter(<App />, { route: MEALS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(WHITE_HEART_PATH));
  });

  test('Exibe ícone do coração preenchido para comida favoritada', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([FAVORITE_MEAL_DATA]));

    renderWithRouter(<App />, { route: MEALS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(BLACK_HEART_PATH));
  });

  test('Exibe ícone do coração vazio para bebida não favoritada', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    renderWithRouter(<App />, { route: DRINKS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(WHITE_HEART_PATH));
  });

  test('Exibe ícone do coração preenchido para bebida favoritada', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([FAVORITE_DRINK_DATA]));

    renderWithRouter(<App />, { route: DRINKS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(BLACK_HEART_PATH));
  });

  test('Alterna favorito para comida', async () => {
    vi.spyOn(api, 'fetchMealsById').mockResolvedValue(mealsMock[0]);
    vi.spyOn(api, 'getDrinksByName').mockResolvedValue(drinksMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    const { user } = renderWithRouter(<App />, { route: MEALS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    await user.click(favoriteBtn);
    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([FAVORITE_MEAL_DATA]);
    });
    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(BLACK_HEART_PATH));

    await user.click(favoriteBtn);
    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([]);
    });
    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(WHITE_HEART_PATH));
  });

  test('Alterna favorito para bebida', async () => {
    vi.spyOn(api, 'fetchDrinksById').mockResolvedValue(drinksMock[0]);
    vi.spyOn(api, 'getMealByName').mockResolvedValue(mealsMock as never);

    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([]));

    const { user } = renderWithRouter(<App />, { route: DRINKS_URL });

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    await user.click(favoriteBtn);
    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([FAVORITE_DRINK_DATA]);
    });
    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(BLACK_HEART_PATH));

    await user.click(favoriteBtn);
    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITE_STORAGE_KEY) || '[]');
      expect(storedFavorites).toEqual([]);
    });
    expect(favoriteBtn).toHaveAttribute('src', expect.stringContaining(WHITE_HEART_PATH));
  });
});
