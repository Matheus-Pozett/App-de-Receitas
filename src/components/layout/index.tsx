import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../header';

function Layout() {
  const [title, setTitle] = useState('');
  const [iconSearch, setIconSearch] = useState(true);

  return (
    <div>
      <Header title={ title } iconSearch={ iconSearch } />
      <div>
        <Outlet context={ { setTitle, setIconSearch } } />
      </div>
    </div>
  );
}

export default Layout;
