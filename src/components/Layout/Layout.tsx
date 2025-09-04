import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../Header';

function Layout() {
  const [title, setTitle] = useState('test');
  return (
    <div>
      <Header title={ title } />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export { Layout };
