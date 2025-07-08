import { CategoriesType } from '../../types';

type CategoriesProps = {
  categories: CategoriesType[];
};

function Categories({ categories }: CategoriesProps) {
  return (
    <div>
      {categories.slice(0, 5).map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export { Categories };
