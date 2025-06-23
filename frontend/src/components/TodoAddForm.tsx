
import { useState, type FormEvent } from "react"
import { addTodo, type Todo, type TodoData } from "../services/todos";
import { validateTodoForm, type TodoFormValues, type ValidationErrors } from "../utils/validation";

interface TodoFormProps {
    onClose: () => void;
    onTodoAdded: (newTodo: Todo) => void;
}

const TodoAddForm: React.FC<TodoFormProps> = ({onClose, onTodoAdded}) => {

    const [name, setName] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [categoriesInput, setCategoriesInput] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrors<TodoFormValues>>({});
    
    const handleFieldChange = (field: keyof TodoFormValues, value: string) => {
      if (field === "name") setName(value);
      if (field === "dueDate") setDueDate(value);
      if (field === "categories") setCategoriesInput(value);

      // Validate this field only
      const fieldErrors = validateTodoForm({ name, dueDate, categories: categoriesInput, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const validationErrors = validateTodoForm({name, dueDate, categories: categoriesInput});
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

    console.log("Submitting todo....");

      const categoriesArray = categoriesInput
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat);

    const todoData: TodoData = {
      name,
      dueDate,
      isCompleted: false,
      categories: categoriesArray,
    };

    try {
        const newTodo = await addTodo(todoData);
        console.log("Todo created:", newTodo);

        onTodoAdded(newTodo);

    onClose();
    } catch(error) {
        console.error(error);
    }

};

  return (
    <form className="bg-gray-100 p-6 rounded w-full max-w-md mx-auto mt-10 shadow-md" 
        onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Add Todo</h2>

        <div className="mb-2">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input 
                id="name"
                type = "text" 
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={name} 
                onChange={e => handleFieldChange("name", e.target.value)} 
                
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
        </div>

        <div className="mb-2">
            <label className="block mb-1 font-semibold" htmlFor="dueDate">
              Due Date
            </label>
            <input
            id="dueDate"
            type="date"
            className={`w-full border px-3 py-2 rounded-md ${
                  errors.dueDate ? "border-red-500" : "border-gray-300"
            }`}
            value={dueDate}
            onChange={e => handleFieldChange("dueDate", e.target.value)}
        />
          {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
      </div>

         <div className="mb-2">
        <label className="block mb-1 font-swmibold" htmlFor="category">
          Categories
        </label>
        <input
          id="categories"
          type="text"
            className={`w-full border px-3 py-2 rounded-md ${
            errors.categories ? "border-red-500" : "border-gray-300"
          }`}
          value={categoriesInput}
          onChange={e => handleFieldChange("categories", e.target.value)}
          placeholder="e.g. coding, frontend"
        />
         {errors.categories && (
          <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
        )}
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

export default TodoAddForm