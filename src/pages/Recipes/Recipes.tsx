import { useLocation } from 'react-router-dom';
import { Meals } from '../Meals';
import { Drinks } from '../Drinks';

function Recipes() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === '/meals' ? (<Meals />) : (<Drinks />)}
    </div>
  );
}

export { Recipes };
