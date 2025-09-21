import { FavoritesType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type MealFavoriteCardProps = {
  fav: FavoritesType
  index: number
};

function MealFavoriteCard({ fav, index }: MealFavoriteCardProps) {
  return (
    <div>
      <div key={ fav.id }>
        <img
          src={ fav.image }
          alt={ `imagem da receita ${fav.name}` }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {fav.nationality}
          {' '}
          -
          {' '}
          {fav.category}
        </p>
        <div>
          <button>
            <img
              src={ shareIcon }
              alt="botão de compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button>
            <img
              src={ blackHeartIcon }
              alt="botão de desfavoritar"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealFavoriteCard;
