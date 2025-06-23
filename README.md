
📝 Todo Project (Spring Boot + React + Vite)
A full-stack Todo application with category management, built with Spring Boot (Java) for the backend and React + Vite for the frontend.
This project allows you to create, update, filter, and organize your tasks with categories, and provides a clean, modern UI.

🚀 Features
## Backend (Spring Boot)
- RESTful API for Todos and Categories
- Soft delete for tasks (isArchived flag)
- Separate tables for todos and categories
- End-to-end tests with Rest Assured

## Frontend (React + Vite + Tailwind)
- Add, update, delete, and filter todos
- Manage categories (add, update, delete)
- Assign multiple categories to a todo
- Responsive, modern UI with Tailwind CSS
- Category badges for better visibility
- Summary section for task counts
- Frontend tests with Vitest and React Testing Library

🏗️ Tech Stack
Backend: Java, Spring Boot, JPA/Hibernate, MySQL (or H2), Rest Assured
Frontend: React, Vite, TypeScript, Tailwind CSS, Vitest, React Testing Library

📦 Project Structure
todoproject/
  ├── src/      # Spring Boot API
  ├── frontend/     # React + Vite UI + Typescript/ Tailwind
  └── README.md

⚙️ Setup & Running
## Backend
1.Install Java 17+ and Maven.
2.Configure your database in application.properties.
3.In the todoproject root, run:
   ## mvn spring-boot:run

## The API will be available at http://localhost:8080.

## Frontend
1. In a new terminal, move to the frontend folder:
    ## cd frontend

2. Install dependencies:
    ## npm install

3. Start the dev server:
    ## npm run dev

## The app will be available at http://localhost:5173 (or the port shown in your terminal).

🛠️ API Endpoints
## Categories
GET    /categories — List all categories
POST   /categories — Create a new category
PUT    /categories/:id — Update a category
DELETE /categories/:id — Delete (archive) a category

## Todos
GET    /todos — List all todos
GET    /todos?category={} — Filter todos by category
POST   /todos — Create a new todo
PUT    /todos/:id — Update a todo
DELETE /todos/:id — Delete (archive) a todo


## Sample Todo JSON

{
  "name": "Create a Spring project",
  "dueDate": "2025-06-01",
  "isCompleted": true,
  "categories": ["coding", "backend"]
}

## Sample Category JSON

{
  "categoryName": "coding"
}

🧪 Testing
## Frontend
- Uses Vitest and React Testing Library
- Run tests with: 
    ## npm run test

## Backend
- Uses Rest Assured for end-to-end API testing
- Run tests with:
    ## mvn test

🎨 UI/UX
- Responsive and modern design with Tailwind CSS
- Category badges for visibility
- Error handling and validation on forms
- Summary section showing counts of each task type

