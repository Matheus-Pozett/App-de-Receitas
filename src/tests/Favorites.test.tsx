import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

describe('Testes da pagina de receitas Favoritas', () => {
  test('Verifica se os elementos estão renderizados na tela', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });

    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });
});
