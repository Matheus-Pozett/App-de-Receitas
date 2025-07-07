import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { OutletContextType } from '../../types';

function DoneRecipes() {
  const { setTitle, setIconSearch } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Done Recipes');
    setIconSearch(false);
  }, [setTitle, setIconSearch]);

  return (
    <div>Recipes</div>
  );
}

export { DoneRecipes };
