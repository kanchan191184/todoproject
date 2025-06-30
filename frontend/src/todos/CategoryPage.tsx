import { useNavigate } from "react-router-dom";
import TodoAddCategory from "../components/TodoAddCategory";
import CategoryCard from "../components/CategoryCard";
import { archiveCategory, getCategories, type Category } from "../services/todos";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoryPage = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

   useEffect(() => {
      getCategories()
        .then((res) => {
          console.log(res, "categories from API");
          setCategories(res);
        })
        .catch(console.warn);
    }, []);

    const handleDelete = async(id: number) => {
        await archiveCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
        toast.success("Category deleted!");
      }
    
  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-8">
      {/* <h2 className="text-2xl font-bold my-6">List of Category</h2> */}
      <TodoAddCategory
        onCategoryAdded={() => navigate("/addCategory")}
        onClose={() => navigate("/")}
      />

    <h2 className="text-2xl font-bold my-6">List of Categories</h2>
    <div className="w-full max-w-5xl">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((category: Category) => !category.isArchived)
              .map((category: Category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onDelete={handleDelete} 
                  onUpdate={(category) => navigate(`/updateCategory/${category.id}`)}
                  />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;