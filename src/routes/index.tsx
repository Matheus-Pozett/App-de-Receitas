import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default AppRoutes;
