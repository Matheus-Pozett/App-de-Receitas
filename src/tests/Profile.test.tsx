import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

const EMAIL_TEST_ID = 'profile-email';
const DONE_TEST_ID = 'profile-done-btn';
const FAVORITE_TEST_ID = 'profile-favorite-btn';
const LOGOUT_TEST_ID = 'profile-logout-btn';
const MOCK_EMAIL = 'test@test.com';

describe('Testes da pagina de Perfil', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: MOCK_EMAIL }));
  });

  afterEach(() => {
    localStorage.clear();
  });
  test('Verifica se os elementos da tela de perfil estão visiveis na tela', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const doneRecipesBtn = screen.getByTestId(DONE_TEST_ID);
    const favoriteRecipesBtn = screen.getByTestId(FAVORITE_TEST_ID);
    const logoutBtn = screen.getByTestId(LOGOUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Verifica se e-mail da pessoa usuária esta visível e no localStorage', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const email = screen.getByTestId(EMAIL_TEST_ID);

    expect(email).toHaveTextContent(MOCK_EMAIL);
  });

  test('Redireciona a pessoa usuária ao clicar no botão `Done Recipes, a rota mude para a tela de receitas feitas', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const doneRecipesBtn = screen.getByTestId(DONE_TEST_ID);

    await user.click(doneRecipesBtn);

    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('Redireciona a pessoa usuária ao clicar no botão Favorite Recipes, a rota mude para a tela de receitas favoritas', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const favoriteRecipesBtn = screen.getByTestId(FAVORITE_TEST_ID);

    await user.click(favoriteRecipesBtn);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('Redireciona a pessoa usuária ao clicar no botão Logout, o localStorage seja limpo e a rota mude para a tela de login', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const logoutBtn = screen.getByTestId(LOGOUT_TEST_ID);

    await user.click(logoutBtn);

    expect(window.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBeNull();
  });
});
