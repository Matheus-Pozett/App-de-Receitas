import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipe';
import MealsDetails from '../pages/MealsDetails/MealsDetails';
import DrinksDetails from '../pages/DrinksDetails';
import Login from '../pages/Login';
import RecipeDetails from '../pages/RecipeDetails';

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
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <DrinksDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <MealsDetails /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
