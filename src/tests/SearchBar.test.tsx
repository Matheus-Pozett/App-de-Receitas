import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

describe('Testes do SearchBar', () => {
  test('Verifica se elementos da barra de busca estão na tela', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchHeaderBtn = screen.getByRole('button', { name: /pesquisar/i });

    await user.click(searchHeaderBtn);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});
