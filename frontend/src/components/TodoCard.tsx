import type { Todo } from "../services/todos";
import CategoryBadge from "./CategoryBadge";
import TodoActions from "./TodoActions";

interface TodoCardProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onUpdate: (todo: Todo) => void;
    onComplete: (id: number) => void;
    isMobile?: boolean;
}

const TodoCard = ({todo, onDelete, onUpdate, onComplete, isMobile = false}: TodoCardProps) => {

    const renderCategoryBadges = () => {
      if (!Array.isArray(todo.categories) || todo.categories.length === 0) {
        return <span className="text-gray-400 italic">No categories</span>;
      }

      return todo.categories.map((cat: any) =>
        cat?.categoryName ? (
          <CategoryBadge key={cat.id ?? cat.categoryName} name={cat.categoryName} color={cat.colorClass} />
        ) : null
      );
    };
  
    const isOverdue = !todo.isCompleted && new Date(todo.dueDate) < new Date();

    return isMobile ? (
       // --- Mobile Card View ---
      <div className={`border border-gray-300 rounded p-3 shadow bg-white 
                      flex flex-col gap-2 p-3 text-sm 
                      md:text-base md:p-6 md:gap-3 md:shadow-lg`}>
        <div><span className="font-semibold">Title:</span> {todo.name}</div>
        <div><span className="font-semibold">Categories:</span> {renderCategoryBadges()}</div>
        <div><span className="font-semibold">Due Date:</span> {todo.dueDate}</div>
        <div>
          <span className="font-semibold">Status:</span>{" "}
          {isOverdue ? (
            <span className="text-red-600 font-bold">Overdue</span>
          ) : (
            <span className="text-green-600">On Time</span>
          )}
        </div>
        <div>
          <span className="font-semibold">Completed:</span> {todo.isCompleted ? "YES" : "NO"}
        </div>

        <TodoActions todo={todo} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} />
      </div>
    ) : (

       // --- Desktop Table Row View ---
      <tr className="border-b border-gray-200">
      <td className="border border-gray-300 font-bold px-4 py-2">{todo.name}</td>
      <td className="border border-gray-300 px-4 py-2">
             {/* Render category badges */}
        {Array.isArray(todo.categories) && todo.categories.length > 0 ? (
          todo.categories.map((cat: any) =>
            cat?.categoryName ? (
              <CategoryBadge key={cat.id ?? cat.categoryName} name={cat.categoryName} color={cat.colorClass} />
            ) : null
          )
        ) : (
          <span className="text-gray-400 italic">No categories</span>
        )}
      </td>
      <td className="border border-gray-300 px-4 py-2">{todo.dueDate}</td>
      <td className="border border-gray-300 px-4 py-2">
        {isOverdue ? (
          <span className="text-red-600 font-semibold">Overdue</span>
        ) : (
          <span className="text-green-600 font-semibold">On Time</span>
        )}
      </td>
      <td className="border border-gray-300 px-4 py-2 font-semibold">
        {todo.isCompleted ? "YES" : "NO"}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <TodoActions todo={todo} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} />
      </td>
    </tr>
  )
}

export default TodoCard;


