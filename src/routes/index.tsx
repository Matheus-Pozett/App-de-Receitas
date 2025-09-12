import { Route, Routes } from 'react-router-dom';
import { DoneRecipes,
  DrinksDetails,
  FavoriteRecipes,
  Login,
  MealsDetails,
  Profile,
  Recipes } from '../pages';
import { Layout } from '../components';

function AppRoutes() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" element={ <Recipes /> } />
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
