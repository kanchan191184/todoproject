import React, { useEffect, useState } from "react";
import { updateTodo, getTodoById, type Todo } from "../services/todos";
import { validateTodoForm, type TodoFormValues, type ValidationErrors } from "../utils/validation";

interface UpdateTodoFormProps {
  todoId: string | undefined;
  onClose: () => void;
  onTodoUpdated: (updatedTodo: Todo) => void;
}

const TodoUpdateForm: React.FC<UpdateTodoFormProps> = ({ todoId, onClose, onTodoUpdated }: UpdateTodoFormProps) => {

    const [todo, setTodo] = useState<Todo | null>(null);
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [categories, setCategories] = useState("");
    const [errors, setErrors] = useState<ValidationErrors<TodoFormValues>>({});

    useEffect(() => {
    if (todoId) {
      getTodoById(todoId).then((data) => {
        setTodo(data);
        setName(data.name);
        setDueDate(data.dueDate);
        setCategories(data.categories.map((cat) => cat.categoryName).join(", "));
      });
    }
  }, [todoId]);

     if (!todo) {
    return <div>Loading...</div>;
    }

    const handleFieldChange = (field: keyof TodoFormValues, value: string) => {
      if (field === "name") setName(value);
      if (field === "dueDate") setDueDate(value);
      if (field === "categories") setCategories(value);

      // Validate this field only
      const fieldErrors = validateTodoForm({ name, dueDate, categories, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
          const validationErrors = validateTodoForm({ name, dueDate, categories });
          setErrors(validationErrors);
          if (Object.keys(validationErrors).length > 0) return;

    const updatedTodo = {
      name,
      dueDate,
      isCompleted: todo.isCompleted,
      categories: categories.split(",").map((cat) => cat.trim())
    };

    try {
    const result = await updateTodo(todo.id, updatedTodo); // <- fetch updated version
    onTodoUpdated(result);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Update Todo</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
           className={`w-full border px-3 py-2 rounded-md ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          value={name}
          onChange={e => handleFieldChange("name", e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-semibold">Due Date</label>
        <input
          type="date"
          className={`w-full border px-3 py-2 rounded-md ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          }`}
          value={dueDate}
          onChange={e => handleFieldChange("dueDate", e.target.value)}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-semibold">Categories (comma separated)</label>
        <input
          type="text"
          className={`w-full border px-3 py-2 rounded-md ${
            errors.categories ? "border-red-500" : "border-gray-300"
          }`}
          value={categories}
          onChange={e => handleFieldChange("categories", e.target.value)}
        />
        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
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
  );
};

export default TodoUpdateForm;
