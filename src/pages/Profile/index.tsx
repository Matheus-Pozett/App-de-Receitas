import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEmailStorage = localStorage.getItem('user');

    if (getEmailStorage) {
      const userEmail = JSON.parse(getEmailStorage);
      setEmail(userEmail.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <p data-testid="profile-email">{email}</p>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
