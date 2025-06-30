import type { Todo } from "../services/todos";

interface TodoActionsProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const TodoActions = ({ todo, onUpdate, onDelete, onComplete }: TodoActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button
        className="bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-600"
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
      <button
        className="bg-green-600 text-white font-semibold px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => onComplete(todo.id)}
        disabled={todo.isCompleted}
      >
        Complete
      </button>
    </div>
  );
};

export default TodoActions;
