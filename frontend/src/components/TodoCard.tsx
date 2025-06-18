import type { Todo } from "../services/todos";

interface TodoCardProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onUpdate: (todo: Todo) => void;
    onComplete: (id: number) => void;
}

const TodoCard = ({todo, onDelete, onUpdate, onComplete}: TodoCardProps) => {
  return (
      <tr className="border-b border-gray-200">
      <td className="border border-gray-300 px-4 py-2">{todo.name}</td>
      <td className="border border-gray-300 px-4 py-2">
        {Array.isArray(todo.categories)
          ? todo.categories
            .map((cat: any) => {
              const name= cat?.categoryName || String(cat);
              return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            })
            .join(",")
          : String(todo.categories)}
      </td>

      <td className="border border-gray-300 px-4 py-2 font-semibold">
        {todo.isCompleted ? "YES" : "NO"}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onUpdate(todo)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-600"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
          <button className="
            bg-green-600 
            text-white 
            font-semibold px-3 py-1 
            rounded hover:bg-green-700
            disabled:bg-gray-400
            disabled:cursor-not-allowed"

            onClick={() => onComplete(todo.id)}
            disabled={todo.isCompleted}
          >
            Complete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TodoCard;