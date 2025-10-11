import { screen } from '@testing-library/dom';
import { vi } from 'vitest/dist/index.js';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

const route = '/favorite-recipes';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Testes da pagina de receitas Favoritas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se os filtros estão renderizados na tela', () => {
    renderWithRouter(<App />, { route });

    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });

  test('Exibe mensagem de nenhuma receita favorita', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
    renderWithRouter(<App />, { route });

    const messageEmpty = screen.getByText(/Nenhuma receita foi favoritada ainda/i);

    expect(messageEmpty).toBeInTheDocument();
  });

  test('Ao clickar no botão de compartilhar receita é copiada', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([{
      id: '53086',
      type: 'meal',
      nationality: 'Spanish',
      category: 'Miscellaneous',
      alcoholicOrNot: '',
      name: 'Migas',
      image: 'https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg',
    }]));

    const { user } = renderWithRouter(<App />, { route });

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    await user.click(shareBtn);

    const message = await screen.findByText(/Link copied!/i);

    expect(message).toBeInTheDocument();
  });
});
