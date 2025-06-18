
import { useState, type ChangeEvent, type FormEvent } from "react"
import { addTodo, type Todo, type TodoData } from "../services/todos";

interface TodoFormProps {
    onClose: () => void;
    onTodoAdded: (newTodo: Todo) => void;
}

const TodoAddForm: React.FC<TodoFormProps> = ({onClose, onTodoAdded}) => {

    const [name, setName] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [categoriesInput, setCategoriesInput] = useState<string>("");


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
            <input 
                id="name"
                type = "text" 
                className="w-full border border-gray-300 px-3 py-2 rounded-md" 
                value={name} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                required 
            />
        </div>

        <div className="mb-2">
            <label className="block mb-1 font-semibold" htmlFor="dueDate">Due Date</label>
            <input
            id="dueDate"
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
            required
        />
      </div>

         <div className="mb-2">
        <label className="block mb-1 font-swmibold" htmlFor="category">Categories</label>
        <input
          id="categories"
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          value={categoriesInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoriesInput(e.target.value)}
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

export default TodoAddForm