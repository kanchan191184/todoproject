// --- Types for forms ---
export interface TodoFormValues {
  name: string;
  dueDate: string;
  categories: string;
}

export interface CategoryFormValues {
  categoryName: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// --- Todo Validation ---
export function validateTodoForm(values: TodoFormValues): ValidationErrors<TodoFormValues> {
  
    const errors: ValidationErrors<TodoFormValues> = {};
    const categoriesArray = values.categories
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat);

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!values.dueDate || values.dueDate.trim() === "") {
    errors.dueDate = "Due date is required";
  }

  if (categoriesArray.length === 0) {
    errors.categories = "At least one category is required";
  }

  return errors;
}

// --- Category Validation ---
export function validateCategoryForm(values: CategoryFormValues): ValidationErrors<CategoryFormValues> {
  const errors: ValidationErrors<CategoryFormValues> = {};
  if (!values.categoryName.trim()) {
    errors.categoryName = "Category name is required";
  } else if (values.categoryName.trim().length < 3) {
    errors.categoryName = "Category name must be at least 3 characters";
  }
  return errors;
}