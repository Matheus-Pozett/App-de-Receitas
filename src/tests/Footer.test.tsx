import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

describe('Testes do componente Footer', () => {
  test('Verifica se elementos estão na tela', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const footer = screen.getByRole('contentinfo');
    const linkDrink = screen.getByRole('link', { name: /botão para página de bebidas/i });
    const linkMeal = screen.getByRole('link', { name: /botão para página de comidas/i });

    expect(footer).toBeInTheDocument();
    expect(linkDrink).toBeInTheDocument();
    expect(linkMeal).toBeInTheDocument();
  });

  test('Verifica se footer está fixado na tela', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveStyle('position: fixed');
  });

  test('Footer não deve estar presente na tela de Login', () => {
    renderWithRouter(<App />);

    const footer = screen.queryByRole('contentinfo');

    expect(footer).not.toBeInTheDocument();
  });

  test('Redireciona a pessoa usuária para a tela de comidas ao clicar no ícone Meal', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const linkMeal = screen.getByRole('link', { name: /botão para página de comidas/i });

    await user.click(linkMeal);

    expect(window.location.pathname).toBe('/meals');
  });

  test('Redireciona a pessoa usuária para a tela de bebidas ao clicar no ícone Drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const linkDrink = screen.getByRole('link', { name: /botão para página de bebidas/i });

    await user.click(linkDrink);

    expect(window.location.pathname).toBe('/drinks');
  });
});
