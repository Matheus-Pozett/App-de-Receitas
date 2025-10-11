/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { FavoritesType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { useShare } from '../../hooks/useShare';

type MealFavoriteCardProps = {
  fav: FavoritesType;
  index: number;
  handleUnfavorite: (recipe: FavoritesType) => void;
};

function MealFavoriteCard({ fav, index, handleUnfavorite }: MealFavoriteCardProps) {
  const { handleShare, isLinkCopied } = useShare();

  const handleClickShare = () => {
    const url = `http://localhost:3000/meals/${fav.id}`;
    handleShare(url);
  };

  return (
    <div
      className="card d-flex flex-row shadow-sm border-0"
      style={ { borderRadius: '12px' } }
    >
      <Link to={ `/meals/${fav.id}` }>
        <img
          src={ fav.image }
          alt={ `imagem da receita ${fav.name}` }
          data-testid={ `${index}-horizontal-image` }
          className="img-fluid"
          style={ {
            width: '140px',
            height: '120px',
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          } }
        />
      </Link>

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <Link to={ `/meals/${fav.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="fw-bold mb-1"
              style={ { fontSize: '1rem' } }
            >
              {fav.name}
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="text-muted small mb-2"
          >
            {fav.nationality}
            {' '}
            -
            {' '}
            {fav.category}
          </p>
        </div>

        <div className="d-flex gap-3">
          <button
            onClick={ handleClickShare }
            className="btn btn-light p-2 rounded-circle"
          >
            <img
              src={ shareIcon }
              alt="botão de compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
              style={ { width: '20px' } }
            />
          </button>
          <button
            onClick={ () => handleUnfavorite(fav) }
            className="btn btn-light p-2 rounded-circle"
          >
            <img
              src={ blackHeartIcon }
              alt="botão de desfavoritar"
              data-testid={ `${index}-horizontal-favorite-btn` }
              style={ { width: '20px' } }
            />
          </button>
        </div>

        {isLinkCopied && (
          <p className="text-success small mt-2">Link copied!</p>
        )}
      </div>
    </div>
  );
}

export default MealFavoriteCard;
