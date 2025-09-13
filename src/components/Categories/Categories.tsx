type CategoriesProps = {
  category: string
  handleCategoryClick: (category: string) => void;
};

function Categories({ category, handleCategoryClick } : CategoriesProps) {
  return (
    <button
      data-testid={ `${category}-category-filter` }
      onClick={ () => handleCategoryClick(category) }
    >
      {category}
    </button>
  );
}

export default Categories;
