type CategoriesProps = {
  category: string;
  handleCategoryClick: (category: string) => void;
  img: string;
};

function Categories({ category, handleCategoryClick, img }: CategoriesProps) {
  return (
    <div className="col-2 d-flex justify-content-center mb-3 p-1">
      <button
        data-testid={ `${category}-category-filter` }
        onClick={ () => handleCategoryClick(category) }
        className="btn d-flex flex-column align-items-center text-warning"
      >
        <div
          className="d-flex justify-content-center align-items-center border
          border-warning rounded-circle p-2 mb-1"
        >
          <img
            src={ img }
            alt={ `Imagem da categoria ${category}` }
            style={ { width: '28px', height: '28px' } }
          />
        </div>
        <small className="text-dark fw-medium">{category}</small>
      </button>
    </div>
  );
}

export default Categories;
