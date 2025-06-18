## Todos API
## Overview

- Create an API to be integrated with your todos-ui project, that allows you to store and retrieve tasks from a database.

MVP
- Deleting a task should set an isArchived flag in the database instead of deleting the task from the database

- Add a filter to the frontend application that allows you to filter tasks by category

- Categories and Todos should be stored in separate tables
Endpoints

- GET /categories

- POST /categories

- PUT /categories/:id

- DELETE /categories/:id

- GET /todos

- GET /todos?category={} query parameters

- POST /todos

- PUT /todos/:id

- DELETE /todos/:id

- todo
{
    "name": "Create a Spring project",
    "dueDate": "2025-06-01",
    "isCompleted": true,
    "categories": ["coding", "backend"]
}

- category
{
    "name": "coding",
}


## Todos UI
Overview

- Your task is to create an application that allows you to track, add, and delete tasks as well as manage categories of tasks.

- Please don't make your app look like this, make it nicer! This is just a summary of what the frontend should be doing: Todos UI Example

## MVP
- Must be able to add categories
- Must be able to add new tasks tagged with a task category
- Must be able to update tasks automatically by changing the task n name and the category
- Must be able to duplicate tasks
- Must be able to delete tasks
- You must add your own styling

## Bonus

- Come up with a feature that allows us to delete and update task categories

- Create a summary section that lists how many of each type of task there are


## API Documentation

 - To run backend, use the command "mvn spring-boot:run" in the terminal. 
 - Make sure you are in base folder - named "todoproject"

 - To run frontend, move to folder "todoproject/frontend".
 - use the command "npm run dev" in the terminal.

 - Run both frontend and backend at the same time to see the application in action.

 - Run the application in your browser at "http://localhost:5173" for frontend (or confirm once which port is showing in the terminal after running frontend). 

