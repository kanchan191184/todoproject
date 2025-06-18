import { useState, type ChangeEvent, type FormEvent } from "react";
import { addCategory, type Category, type TodoCategory } from "../services/todos";


interface TodoCategoryProps {
  onClose: () => void;
  onCategoryAdded: (newCategory: Category) => void;
}

const TodoAddCategory: React.FC<TodoCategoryProps> = ({onClose, onCategoryAdded}) => {
  
    const [categoryName, setCategoryName] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            <label htmlFor="name" className="block mb-1 font-semibold">Category Name</label>
            <input 
                id="name"
                type = "text" 
                className="w-full border border-gray-300 px-3 py-2 rounded-md" 
                value={categoryName} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
                placeholder="e.g. coding, frontend"  
                required 
            />
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