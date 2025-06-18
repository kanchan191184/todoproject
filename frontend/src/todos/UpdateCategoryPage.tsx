
import { useNavigate, useParams } from "react-router-dom";
import CategoryUpdateForm from "../components/CategoryUpdateForm";

const UpdateCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      <h2 className="text-2xl font-bold my-6">Update Category</h2>
      <CategoryUpdateForm
        categoryId={id}
        onCategoryUpdated={() => navigate("/addCategory")}
        onClose={() => navigate("/addCategory")}
      />
    </div>
  );
};

export default UpdateCategoryPage;