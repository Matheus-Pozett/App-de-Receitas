import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react'; // Adicione o import do React
import { RecipesContextProvider } from '../context/RecipesContext';
import { FavoriteContextProvider } from '../context/FavoritesContext';

export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <RecipesContextProvider>
          <FavoriteContextProvider>
            {ui}
          </FavoriteContextProvider>
        </RecipesContextProvider>
      </BrowserRouter>,
    ),
  };
};
