import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react'; // Adicione o import do React
import { RecipesContextProvider } from '../context/RecipesContext';

export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <RecipesContextProvider>
          {ui}
        </RecipesContextProvider>
      </BrowserRouter>,
    ),
  };
};
