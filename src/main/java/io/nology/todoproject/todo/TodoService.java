package io.nology.todoproject.todo;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.nology.todoproject.category.Category;
import io.nology.todoproject.category.CategoryRepository;

/**
 * Service layer for handling Todo-related business logic.
 * Acts as an intermediary between the controller and repository layers.
*/
@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;

    public TodoService(TodoRepository todoRepository, CategoryRepository categoryRepository) {
        this.todoRepository = todoRepository;
        this.categoryRepository = categoryRepository;
    }

     /**
     * Creates a new Todo with the given data and associated categories.
     * If a category does not exist, it will be automatically created and saved.
     */

    public Todo create(CreateTodoDTO data) {
    Todo todo = new Todo();
    todo.setName(data.getName());
    todo.setIsCompleted(data.getIsCompleted());
    todo.setDueDate(data.getDueDate());
    todo.setIsArchived(false);

    // Convert category names into Category entities (create if not exist)
    Set<Category> categories = Arrays.stream(data.getCategories())
        .map(name -> categoryRepository.findByCategoryName(name)
                .orElseGet(() -> {
                Category newCategory = new Category();
                newCategory.setCategoryName(name);
                return categoryRepository.save(newCategory); // ✅ Save new category
            })
        )
        .collect(Collectors.toSet());
    todo.setCategories(categories);
    return todoRepository.save(todo);
}

     /**
     * Fetches all non-archived Todos.
     * If a category is specified, filters Todos by that category (only non-archived).
     */

    public List<Todo> findAll(String category) {
    if (category != null) {
        return todoRepository.findByCategories_CategoryNameAndIsArchivedFalseAndCategories_IsArchivedFalse(category);
    }
    return todoRepository.findByIsArchivedFalse();
}

    
    /**
     * Retrieves a Todo by its ID.
     */
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

     /**
     * Soft deletes a Todo by setting its `isArchived` flag to true.
     */
    public boolean deleteById(Long id) {
        Optional<Todo> found = todoRepository.findById(id);
        if (found.isEmpty()) return false;
        Todo todo = found.get();
        todo.setIsArchived(true);
        todoRepository.save(todo);
        return true;
    }

     /**
     * Updates a Todo with the provided data.
     * Also handles category updates — creates new categories if they don't exist.
     */
    public Optional<Todo> updateById(Long id, UpdateTodoDTO data) {
    Optional<Todo> foundTodo = this.findById(id);
    if(foundTodo.isEmpty()) {
        return foundTodo;
    }

    // Update fields if new data is provided
    Todo todoFromDB = foundTodo.get();
    if (data.getName() != null) todoFromDB.setName(data.getName());
    if (data.getIsCompleted() != null) todoFromDB.setIsCompleted(data.getIsCompleted());
    if (data.getDueDate() != null) todoFromDB.setDueDate(data.getDueDate());

    
    // Handle category update and auto-create any new categories
    if (data.getCategories() != null) {

        //If you try to update a todo with a category name that does not exist in the database, 
        //it will auto-create category in category table

        Set<Category> categories = Arrays.stream(data.getCategories())
            .map(name -> categoryRepository.findByCategoryName(name)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setCategoryName(name);
                    return categoryRepository.save(newCategory);
                }))
            .collect(Collectors.toSet());
        todoFromDB.setCategories(categories);
    }

    this.todoRepository.save(todoFromDB);
    return Optional.of(todoFromDB);
}

    /**
     * Marks a Todo as completed.
    */
    public Optional<Todo> markComplete(Long id) {
        Optional<Todo> found = todoRepository.findById(id);
        if(found.isEmpty()) return Optional.empty();

        Todo todo = found.get();
        todo.setIsCompleted(true);
        return Optional.of(todoRepository.save(todo));
    }

    /**
     * Archives (soft deletes) a Todo.
     */
    public Optional<Todo> markArchived(Long id) {
        Optional<Todo> found = todoRepository.findById(id);
        if(found.isEmpty()) return Optional.empty();

        Todo todo = found.get();
        todo.setIsArchived(true);
        return Optional.of(todoRepository.save(todo));
    }

}
