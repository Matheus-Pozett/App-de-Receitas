type CategoriesProps = {
  category: string
};

function Categories({ category } : CategoriesProps) {
  return (
    <button data-testid={ `${category}-category-filter` }>
      {category}
    </button>
  );
}

export default Categories;
