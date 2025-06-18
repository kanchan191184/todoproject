package io.nology.todoproject.todo;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.nology.todoproject.category.Category;
import io.nology.todoproject.category.CategoryRepository;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;

    public TodoService(TodoRepository todoRepository, CategoryRepository categoryRepository) {
        this.todoRepository = todoRepository;
        this.categoryRepository = categoryRepository;
    }

    public Todo create(CreateTodoDTO data) {
    Todo todo = new Todo();
    todo.setName(data.getName());
    todo.setIsCompleted(data.getIsCompleted());
    todo.setDueDate(data.getDueDate());
    todo.setIsArchived(false);

    // Handle categories as an array of names
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

    public List<Todo> findAll(String category) {
    if (category != null) {
        return todoRepository.findByCategories_CategoryNameAndIsArchivedFalseAndCategories_IsArchivedFalse(category);
    }
    return todoRepository.findByIsArchivedFalse();
}

    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    public boolean deleteById(Long id) {
        Optional<Todo> found = todoRepository.findById(id);
        if (found.isEmpty()) return false;
        Todo todo = found.get();
        todo.setIsArchived(true);
        todoRepository.save(todo);
        return true;
    }

    public Optional<Todo> updateById(Long id, UpdateTodoDTO data) {
    // Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));

    Optional<Todo> foundTodo = this.findById(id);

    if(foundTodo.isEmpty()) {
        return foundTodo;
    }

    Todo todoFromDB = foundTodo.get();

    if (data.getName() != null) todoFromDB.setName(data.getName());
    if (data.getIsCompleted() != null) todoFromDB.setIsCompleted(data.getIsCompleted());
    if (data.getDueDate() != null) todoFromDB.setDueDate(data.getDueDate());
    if (data.getCategories() != null) {
        Set<Category> categories = Arrays.stream(data.getCategories())
            .map(name -> categoryRepository.findByCategoryName(name)
                .orElseThrow(() -> new RuntimeException("Category not found: " + name)))
            .collect(Collectors.toSet());
        todoFromDB.setCategories(categories);
    }
    this.todoRepository.save(todoFromDB);
    return Optional.of(todoFromDB);
}

public Optional<Todo> markComplete(Long id) {
    Optional<Todo> found = todoRepository.findById(id);
    if(found.isEmpty()) return Optional.empty();

    Todo todo = found.get();
    todo.setIsCompleted(true);
    return Optional.of(todoRepository.save(todo));
}

public Optional<Todo> markArchived(Long id) {
    Optional<Todo> found = todoRepository.findById(id);
    if(found.isEmpty()) return Optional.empty();

    Todo todo = found.get();
    todo.setIsArchived(true);
    return Optional.of(todoRepository.save(todo));
}

}
