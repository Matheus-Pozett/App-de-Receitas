import { Route, Routes } from 'react-router-dom';
import { DoneRecipes,
  Drinks,
  DrinksDetails,
  FavoriteRecipes,
  Login,
  Meals,
  MealsDetails,
  Profile } from '../pages';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/meals/:id" element={ <MealsDetails /> } />
      <Route path="/drinks/:id" element={ <DrinksDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <MealsDetails /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksDetails /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default AppRoutes;
