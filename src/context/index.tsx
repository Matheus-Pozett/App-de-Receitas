import { FavoriteContextProvider } from './FavoritesContext';
import { RecipesContextProvider } from './RecipesContext';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecipesContextProvider>
      <FavoriteContextProvider>
        {children}
      </FavoriteContextProvider>
    </RecipesContextProvider>
  );
}

export default AppProvider;
