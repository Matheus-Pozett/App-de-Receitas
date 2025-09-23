import { createContext, useContext, useState } from 'react';
import { Recipe } from '../types';

type RecipesContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

// CRIA CONTEXTO
const RecipeContext = createContext<RecipesContextType | undefined>(undefined);

// CRIA PROVIDER
function RecipesContextProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const contextValue = {
    recipes,
    setRecipes,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

// CRIA HOOK
const useRecipes = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('useRecipes deve ser usado dentro de um RecipesContextProvider');
  }

  return context;
};

export { RecipesContextProvider, useRecipes };
