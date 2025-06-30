import { useEffect, useState } from "react";
import { archiveTodo, getTodos, completeTodo, type Todo } from "../services/todos";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TodosPage = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
    // view toggle
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const navigate = useNavigate();

  useEffect(() => {
    getTodos()
      .then((res) => {
        console.log(res, "todos from API");
        setTodos(res);
      })
      .catch(console.warn);
  }, []);

  const handleDelete = async(id: number) => {
    await archiveTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted!");
  }

  const handleComplete = async(id: number) => {
    await completeTodo(id);
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: true} : todo
      )
    );
    toast.success("Todo marked as complete!");
  };

   const toggleView = () => {
    setViewMode((prev) => (prev === "table" ? "card" : "table"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <nav className="w-full bg-black text-white py-4 text-xl font-semibold px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left Buttons for desktop, centered below title in mobile*/}
          <div className="flex gap-4 flex-wrap order-2 md:order-1 justify-center md:justify-start">
            <button
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/addCategory")}
            >
              Category
            </button>

            <button
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate("/add")}
            >
              Add Todo
            </button>
          </div>

          {/* Center Heading */}
          <div className="order-1 md:order-2 text-center w-full md:w-auto">
              <h1 className="text-2xl font-bold">Todo Management Application</h1>
          </div>

          {/* Right Button - Toggle View - Desktop Only */}
          <div className="order-3 hidden md:block">
          <button
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 hidden md:inline-block"
            onClick={toggleView}
          >
            {viewMode === "table" ? "Todo - Card View" : "Todo - Table View"}
          </button>
          </div>
        </div>
      </nav>

      <h2 className="text-2xl font-bold my-6">List of Todos</h2>

      <div className="w-full max-w-5xl">

        {/* Table for desktop if viewMode === 'table' **/}
        {viewMode === "table" && (
        <table className="w-full border-collapse border border-gray-300 text-sm md:table hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Todo Title</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Todo Categories</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Todo Due Date</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Todo Status</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Todo Completed</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-left break-words">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo: Todo) => !todo.isArchived)
              .map((todo: Todo) => (
                <TodoCard 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={handleDelete} 
                  onUpdate={(todo) => navigate(`/update/${todo.id}`)}
                  onComplete={handleComplete}
                  isMobile = {false}
                  />
              ))}
          </tbody>
        </table>
        )}

        {/* Card view for desktop if viewMode is card */}
        {viewMode === "card" && (
          <div className="flex-col gap-4 md:flex hidden">
            {todos
              .filter((todo) => !todo.isArchived)
              .map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDelete}
                  onUpdate={() => navigate(`/update/${todo.id}`)}
                  onComplete={handleComplete}
                  isMobile={true} 
                />
              ))}
          </div>
        )}

         {/* Cards for mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {todos
              .filter((todo: Todo) => !todo.isArchived)
              .map((todo: Todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDelete}
                  onUpdate={(todo) => navigate(`/update/${todo.id}`)}
                  onComplete={handleComplete}
                  isMobile={true} // ← mobile rendering!
                />
            ))}
          </div>
      </div>
    </div>
  );
};

export default TodosPage;