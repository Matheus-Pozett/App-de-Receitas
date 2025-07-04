import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../../types';

function Favorites() {
  const { setTitle, setIconSearch } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Favorite Recipes');
    setIconSearch(false);
  }, [setTitle, setIconSearch]);

  return (
    <div>Favorites</div>
  );
}

export { Favorites };
