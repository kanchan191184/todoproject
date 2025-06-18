import TodoUpdateForm from "../components/TodoUpdateForm";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <h2 className="text-2xl font-bold my-6">Update Todo</h2>
      <TodoUpdateForm
        todoId={id}
        onTodoUpdated={() => navigate("/")}
        onClose={() => navigate("/")}
      />
    </div>
  );
};

export default UpdateFormPage;