
import React, { useEffect, useState } from "react";
import { updateTodo, getTodoById, type Todo } from "../services/todos";


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


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

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
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-semibold">Due Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-semibold">Categories (comma separated)</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
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
  );
};

export default TodoUpdateForm;
