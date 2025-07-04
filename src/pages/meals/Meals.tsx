import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../../types';

function Meals() {
  const { setTitle } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Meals');
  }, [setTitle]);

  return (
    <div>meals</div>
  );
}

export { Meals };
