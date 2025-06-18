import { useEffect, useState } from "react";
import { getCategoryById, updateCategory, type Category } from "../services/todos";

interface UpdateCategoryFormProps {
    categoryId: string | undefined;
    onClose: () => void;
    onCategoryUpdated: (updatedCategory: Category) => void;
}

const CategoryUpdateForm: React.FC<UpdateCategoryFormProps> = ({categoryId, onCategoryUpdated, onClose}: UpdateCategoryFormProps) => {
  
    const [category, setCategory] = useState<Category | null>(null);
    const [categoryName, setCategoryName] = useState("");
    
     useEffect(() => {
        if (categoryId) {
          getCategoryById(categoryId).then((data) => {
            setCategory(data);
            setCategoryName(data.categoryName);
          });
        }
      }, [categoryId]);

      if(!category) {
        return <div>Loading...</div>
      }

      const handleUpdate = async (e: React.FormEvent) => {
              e.preventDefault();
      
          const updatedCategory = {
            categoryName,
          };
      
          try {
          const result = await updateCategory(category.id, updatedCategory); // <- fetch updated version
          onCategoryUpdated(result);
          onClose();       // close form
          } catch (error) {
            console.error("Update failed:", error);
          }
        };  
    return (
    
    <form
      onSubmit={handleUpdate}
      className="bg-gray-100 p-6 rounded w-full max-w-md mx-auto mt-10 shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Update Category</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Category Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-1 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          className="bg-red-400 text-white font-semibold px-4 py-1 rounded hover:bg-gray-500"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      </form>
  )
}

export default CategoryUpdateForm