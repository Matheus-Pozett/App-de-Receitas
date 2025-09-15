import { screen } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';
import Header from '../components/Header';

const PROFILE_TEST_ID = 'profile-top-btn';

describe('Componente Header', () => {
  test('Testa se elementos estão presentes no header', () => {
    render(
      <MemoryRouter>
        <Header title="Meals" icon="../images/icone-prato.svg" />
      </MemoryRouter>,
    );

    const header = screen.getByRole('banner');
    const logoApp = screen.getByRole('img', { name: /icone do app/i });
    const nameApp = screen.getByRole('img', { name: /nome do site/i });
    const profileBtn = screen.getByTestId(PROFILE_TEST_ID);
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(header).toBeInTheDocument();
    expect(logoApp).toBeInTheDocument();
    expect(nameApp).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Header deve estar presentes na rota /meals', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const logoApp = screen.getByRole('img', { name: /icone do app/i });
    const nameApp = screen.getByRole('img', { name: /nome do site/i });
    const profileBtn = screen.getByTestId(PROFILE_TEST_ID);
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(logoApp).toBeInTheDocument();
    expect(nameApp).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Verifica se o título na rota /meals é Meals', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent(/meals/i);
  });

  test('Verifica se o título na rota /drinks é Drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent(/drinks/i);
  });

  test('Botão de pesquisa não deve estar presente na rota /profile', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const searchBtn = screen.queryByRole('button', { name: /pesquisar/i });

    expect(searchBtn).not.toBeInTheDocument();
  });

  test('Testa se redireciona para rota /profile ao clicar no botão profile', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const profileBtn = screen.getByTestId(PROFILE_TEST_ID);

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
