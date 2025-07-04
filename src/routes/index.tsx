import { Route, Routes } from 'react-router-dom';
import { DrinkDetail, Drinks, DrinksProgress, Favorites, Login, MealDetail, Meals,
  MealsProgress, Profile, Recipes } from '../pages';
import Layout from '../components/layout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/done-recipes" element={ <Recipes /> } />
        <Route path="/favorite-recipes" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Route>
      <Route path="/meals/:id" element={ <MealDetail /> } />
      <Route path="/drinks/:id" element={ <DrinkDetail /> } />
      <Route path="/meals/:id/in-progress" element={ <MealsProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <DrinksProgress /> } />
    </Routes>
  );
}

export default AppRoutes;
