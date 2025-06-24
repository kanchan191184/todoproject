import { useEffect, useState } from "react";
import { archiveTodo, getTodos, completeTodo, type Todo } from "../services/todos";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

const TodosPage = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
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
  }

  const handleComplete = async(id: number) => {
    await completeTodo(id);
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: true} : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <nav className="w-full bg-black text-white py-4 text-xl font-semibold">
        {/* <h3 className="my-6">Todo Management Application</h3> */}

        <div className="flex justify-space-between my-4">
        
         <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 mx-4 mb-4"
          onClick={() => navigate("/addCategory")}
        >
          Category
        </button>

        <button
          className="
            bg-blue-600 
            text-white 
            font-semibold px-4 py-2 
            rounded hover:bg-blue-700
            mx-4 mb-4"
          onClick={() => navigate("/add")}
        >
          Add Todo
        </button>
         {/* <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 mx-4 mb-4"
          onClick={() => navigate("/addCategory")}
        >
          Add Category
        </button> */}
      </div>
      </nav>

      <h2 className="text-2xl font-bold my-6">List of Todos</h2>

      <div className="w-full max-w-5xl">

        {/* Table for desktop */}
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
                  />
              ))}
          </tbody>
        </table>

         {/* Cards for mobile */}
          <div className="flex flex-col gap-4 md:hidden">
          {todos
            .filter((todo: Todo) => !todo.isArchived)
            .map((todo: Todo) => (
              <div key={todo.id} className="border border-gray-300 rounded p-3 shadow bg-white">
                <div><span className="font-semibold">Title:</span> {todo.name}</div>
                <div><span className="font-semibold">Categories:</span> {Array.isArray(todo.categories) ? todo.categories.map((cat: any) => cat?.categoryName || String(cat)).join(", ") : String(todo.categories)}</div>
                <div><span className="font-semibold">Due Date:</span> {todo.dueDate}</div>
                <div><span className="font-semibold">Status:</span> {!todo.isCompleted && new Date(todo.dueDate) < new Date() ? <span className="text-red-600 font-bold">Overdue</span> : <span className="text-green-600">On Time</span>}</div>
                <div><span className="font-semibold">Completed:</span> {todo.isCompleted ? "YES" : "NO"}</div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-600" onClick={() => navigate(`/update/${todo.id}`)}>Update</button>
                  <button className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(todo.id)}>Delete</button>
                  <button className="bg-green-600 text-white font-semibold px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={() => handleComplete(todo.id)} disabled={todo.isCompleted}>Complete</button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default TodosPage;