import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doneIcon from '../../images/doneIcon.svg';
import favoriteIcon from '../../images/favoritesIcon.svg';
import logoutIcon from '../../images/logoutIcon.svg';

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
    <div className="container text-center my-4">
      <p
        data-testid="profile-email"
        className="fw-bold mb-4"
      >
        {email}
      </p>

      <div className="d-flex flex-column gap-4">
        <div
          className="d-flex align-items-center justify-content-start border-bottom pb-3"
        >
          <img src={ doneIcon } alt="Done Recipe" className="me-3" />
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
            className="btn btn-link text-secondary text-decoration-none fw-semibold"
          >
            Done Recipes
          </button>
        </div>

        <div
          className="d-flex align-items-center justify-content-start border-bottom pb-3"
        >
          <img src={ favoriteIcon } alt="favorite" className="me-3" />
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
            className="btn btn-link text-secondary text-decoration-none fw-semibold"
          >
            Favorite Recipes
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-start">
          <img src={ logoutIcon } alt="logout" className="me-3" />
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            className="btn btn-link text-secondary text-decoration-none fw-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
