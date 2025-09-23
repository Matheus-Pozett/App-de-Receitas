/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';
import { DoneRecipesType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';

type DoneRecipeMealProps = {
  recipe: DoneRecipesType;
  index: number;
};

function DoneRecipeMealCard({ recipe, index }: DoneRecipeMealProps) {
  const { handleShare, isLinkCopied } = useShare();

  const handleClickShare = () => {
    const url = `http://localhost:3000/meals/${recipe.id}`;
    handleShare(url);
  };

  return (
    <div>
      <Link to={ `/meals/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ `imagem da receita ${recipe.name}` }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <button
        onClick={ handleClickShare }
      >
        <img
          src={ shareIcon }
          alt="botão de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
          style={ { width: '20px' } }
        />
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.nationality}
        {' '}
        -
        {' '}
        {recipe.category}
      </p>
      <Link to={ `/meals/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Done in : ${recipe.doneDate}`}</p>
      <div>
        {recipe.tags.map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>
        ))}
      </div>
      {isLinkCopied && (
        <p>Link copied!</p>
      )}
    </div>
  );
}

export default DoneRecipeMealCard;
