/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';
import { DoneRecipesType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';

type DoneRecipeDrinkProps = {
  recipe: DoneRecipesType;
  index: number;
};

function DoneRecipeDrinkCard({ recipe, index }: DoneRecipeDrinkProps) {
  const { handleShare, isLinkCopied } = useShare();

  const handleClickShare = () => {
    const url = `http://localhost:3000/drinks/${recipe.id}`;
    handleShare(url);
  };

  return (
    <div className="card shadow-sm border-0 overflow-hidden">
      <div className="row g-0">
        {/* Imagem */}
        <div className="col-5">
          <Link to={ `/drinks/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ `imagem da bebida ${recipe.name}` }
              className="img-fluid h-100 object-fit-cover"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>

        {/* Conteúdo */}
        <div className="col-7 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start">
              <Link to={ `/drinks/${recipe.id}` } className="text-decoration-none">
                <p
                  data-testid={ `${index}-horizontal-name` }
                  className="fw-bold text-dark mb-0"
                >
                  {recipe.name}
                </p>
              </Link>

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
            </div>

            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="text-muted small mb-1"
            >
              {recipe.alcoholicOrNot}
            </p>

            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="small text-secondary mb-1"
            >
              Done in:
              {' '}
              {recipe.doneDate}
            </p>
          </div>

          {/* Tags */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="badge bg-light text-dark border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isLinkCopied && (
        <p className="text-success text-center small mb-2">Link copied!</p>
      )}
    </div>
  );
}

export default DoneRecipeDrinkCard;
