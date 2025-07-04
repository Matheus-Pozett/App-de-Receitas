import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { OutletContextType } from '../../types';

function Profile() {
  const { setTitle, setIconSearch } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setTitle('Profile');
    setIconSearch(false);
  }, [setTitle, setIconSearch]);

  return (
    <div>Profile</div>
  );
}

export { Profile };
