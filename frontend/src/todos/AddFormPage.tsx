import TodoAddForm from "../components/TodoAddForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const AddFormPage = () => {
  const navigate = useNavigate();

   // Show toast, then navigate
   const handleTodoAdded = () => {
    toast.success("New todo added!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <h2 className="text-2xl font-bold my-6">Add New Todo</h2>
      <TodoAddForm
        onTodoAdded={handleTodoAdded}
        onClose={() => navigate("/")}
      />
    </div>
  );
};

export default AddFormPage;