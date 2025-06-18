
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodosPage from './todos/TodosPage.tsx';
import AddFormPage from './todos/AddFormPage.tsx';
import UpdateFormPage from './todos/UpdatedFormPage.tsx';
import CategoryPage from './todos/CategoryPage.tsx';
import UpdateCategoryPage from './todos/UpdateCategoryPage.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/add" element={<AddFormPage />} />
        <Route path="/update/:id" element={<UpdateFormPage />} />
        <Route path="/addCategory" element={<CategoryPage />} />
        <Route path="/updateCategory/:id" element={<UpdateCategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
