import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../../types';

function Drinks() {
  const { setTitle } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Drinks');
  }, [setTitle]);

  return (
    <div>Drinks</div>
  );
}

export { Drinks };
