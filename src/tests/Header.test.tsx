import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

describe('Componente Header', () => {
  test('Elementos devem estar presentes na tela', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const logoApp = screen.getByRole('img', { name: /icone do app/i });
    const nameApp = screen.getByRole('img', { name: /nome do site/i });
    const profileBtn = screen.getByRole('link', { name: /Profile/i });
    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });

    expect(logoApp).toBeInTheDocument();
    expect(nameApp).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Verifica se o título na rota /meals é Meals', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toHaveTextContent(/meals/i);
  });

  test('Verifica se o título na rota /drinks é Drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toHaveTextContent(/drinks/i);
  });

  test('Botão de pesquisa não deve estar presente na rota /profile', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const searchBtn = screen.queryByRole('button', { name: /pesquisar/i });

    expect(searchBtn).not.toBeInTheDocument();
  });

  test('Testa se redireciona para rota /profile ao clicar no botão profile', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const profileBtn = screen.getByRole('link', { name: /Profile/i });

    await user.click(profileBtn);

    expect(window.location.pathname).toBe('/profile');
  });

  test('Verifica se a barra de busca está oculta ao renderizar', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const inputSearchBarOff = screen.queryByRole('textbox', { name: /Pesquisar/i });
    expect(inputSearchBarOff).not.toBeInTheDocument();

    const searchBtn = screen.getByRole('button', { name: /pesquisar/i });
    await user.click(searchBtn);

    const inputSearchBarOn = screen.getByRole('textbox', { name: /Pesquisar/i });

    expect(inputSearchBarOn).toBeInTheDocument();
  });
});
