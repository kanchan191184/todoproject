import type { Category } from "../services/todos";
import CategoryBadge from "./CategoryBadge";

interface CategoryCardProps {
    category: Category;
    onDelete: (id: number) => void;
    onUpdate: (category: Category) => void;
}
const CategoryCard = ({category, onDelete, onUpdate}: CategoryCardProps) => {

  return (
    <tr className="border-b border-gray-200">
      <td className="border border-gray-300 px-4 py-2">
        <CategoryBadge name = {category.categoryName} />
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onUpdate(category)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-600"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </button>
      </div>
      </td>
    </tr>
  )
}

export default CategoryCard;