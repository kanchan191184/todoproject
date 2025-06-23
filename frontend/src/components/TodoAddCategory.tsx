import { useState, type ChangeEvent, type FormEvent } from "react";
import { addCategory, type Category, type TodoCategory } from "../services/todos";
import { validateCategoryForm, type CategoryFormValues, type ValidationErrors } from "../utils/validation";


interface TodoCategoryProps {
  onClose: () => void;
  onCategoryAdded: (newCategory: Category) => void;
}

const TodoAddCategory: React.FC<TodoCategoryProps> = ({onClose, onCategoryAdded}) => {
  
    const [categoryName, setCategoryName] = useState<string>("");
    const [error, setError] = useState<ValidationErrors<CategoryFormValues>>({});

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
    const fieldErrors = validateCategoryForm({ categoryName: e.target.value });
    setError((prev) => ({ ...prev, categoryName: fieldErrors.categoryName }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateCategoryForm({categoryName});
        setError(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        console.log("Submitting Category.....");

        const categoryData: TodoCategory = {
            categoryName,
        };

        try {
            const newCategory = await addCategory(categoryData);
            console.log("Category created:" , newCategory);

            onCategoryAdded(newCategory);
            onClose();
        } catch(error) {
            console.log(error);
        }
    };

    return (
    <form className="bg-gray-100 p-6 rounded w-full max-w-md mx-auto mt-10 shadow-md" 
        onSubmit={handleSubmit}>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Add Category</h2>
         <div className="mb-2">
            <label htmlFor="name" className="block mb-1 font-semibold">
                Category Name
            </label>
            <input 
                id="name"
                type = "text" 
                className={`w-full border px-3 py-2 rounded-md ${
                    error.categoryName ? "border-red-500" : "border-gray-300"
                }`}
                value={categoryName} 
                onChange={handleCategoryNameChange}
                placeholder="e.g. coding, frontend"  
            />
             {error.categoryName && <p className="text-red-500 text-sm mt-1">{error.categoryName}</p>}
        </div>

        <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-green-500 text-white font-semibold px-4 py-1 rounded hover:bg-green-600">
            Save
            </button>
            <button type="button" className="bg-red-400 text-white font-semibold px-4 py-1 rounded hover:bg-gray-500" 
                onClick={onClose}>
            Go Back
            </button>
      </div>

    </form>
  )
}

export default TodoAddCategory