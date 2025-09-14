import { RecipesContextProvider } from './RecipesContext';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecipesContextProvider>
      {children}
    </RecipesContextProvider>
  );
}

export default AppProvider;
