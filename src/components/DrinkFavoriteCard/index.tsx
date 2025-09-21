import { FavoritesType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { useShare } from '../../hooks/useShare';

type MealFavoriteCardProps = {
  fav: FavoritesType
  index: number
};

function DrinkFavoriteCard({ fav, index }: MealFavoriteCardProps) {
  const { handleShare, isLinkCopied } = useShare();

  const handleClickShare = () => {
    const url = `http://localhost:3000/drinks/${fav.id}`;
    handleShare(url);
  };

  return (
    <div>
      <div key={ fav.id }>
        <img
          src={ fav.image }
          alt={ `imagem da receita ${fav.name}` }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{fav.name}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{fav.alcoholicOrNot}</p>
        <div>
          <button onClick={ handleClickShare }>
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
        {isLinkCopied && <p>Link copied!</p>}
      </div>
    </div>
  );
}

export default DrinkFavoriteCard;
