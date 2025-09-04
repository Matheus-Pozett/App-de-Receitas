import { Route, Routes } from 'react-router-dom';
import { DoneRecipes,
  Drinks,
  DrinksDetails,
  FavoriteRecipes,
  Login,
  Meals,
  MealsDetails,
  Profile } from '../pages';
import { Layout } from '../components';

function AppRoutes() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals/:id" element={ <MealsDetails /> } />
      <Route path="/drinks/:id" element={ <DrinksDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <MealsDetails /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
