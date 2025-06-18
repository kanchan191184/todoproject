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

      <div w-full max-w-5xl>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Todo Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Todo Categories</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Todo Completed</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
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
      </div>
    </div>
  );
};

export default TodosPage;