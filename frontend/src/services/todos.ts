const API_URL = import.meta.env.VITE_API_URL;

export interface Category {
    id: number;
    categoryName: string;
    isArchived: boolean;
}

export interface Todo {
    id: number;
    name: string;
    isCompleted: boolean;
    isArchived: boolean;
    dueDate: string;
    categories: Category[];
}

export interface TodoData {
    name: string;
    isCompleted: boolean;
    dueDate: string;
    categories: string[];
}

export interface TodoCategory {
    categoryName: string;
}

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/todos`);
    const todos = await response.json();
    return todos;
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/categories`);
    const categories = await response.json();
    return categories;
}


export const getTodoById = async (id: string | number): Promise<Todo> => {
 const response = await fetch(`${API_URL}/todos/${id}`);
  if (!response.ok) 
    throw new Error("Failed to fetch todo");

  return await response.json();
};

export const getCategoryById = async (id: string | number): Promise<Category> => {
const response = await fetch(`${API_URL}/categories/${id}`);
  if (!response.ok) 
    throw new Error("Failed to fetch categories");

  return await response.json();
};

export const archiveTodo = async (id: number): Promise<void> => {
     await fetch(`${API_URL}/todos/${id}/archive`, {
        method: "PATCH",
    });
}

export const archiveCategory = async (id: number): Promise<void> => {
     await fetch(`${API_URL}/categories/${id}/archive`, {
        method: "PATCH",
    });
}

export const completeTodo = async (id: number): Promise<void> => {
      await fetch(`${API_URL}/todos/${id}/complete`, {
        method: "PATCH"
    });
}

export const addTodo = async (todoData: TodoData): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todos`, {
         method: "POST",
         headers: {"Content-Type": "application/json" },
         body: JSON.stringify(todoData)
    });

    if (!response.ok) {
        throw new Error("Failed to add todo");
    }
    const result = await response.json();
    console.log("Response from backened", result);
    return result;
};

export const addCategory = async (todoCategory: TodoCategory): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(todoCategory)
    });

    if(!response.ok) {
        throw new Error("Failed to add category");
    }

    const result = await response.json();
    return result;
}

export const updateTodo = async (
    id: number,
    data: {name: string, dueDate: string, isCompleted: boolean; categories: string[]}

): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error("Failed to update todo");
    }

    return await response.json();
};


export const updateCategory = async (
    id: number,
    data: {categoryName: string}

): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories/${id}`, {    
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error("Failed to update categories");
    }

    return await response.json();
};