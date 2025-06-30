package io.nology.todoproject.category;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import io.nology.todoproject.common.ValidationErrors;
import io.nology.todoproject.common.exceptions.ServiceValidationException;
import io.nology.todoproject.todo.Todo;
import io.nology.todoproject.todo.TodoRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoryService {
    
    private CategoryRepository categoryRepository;
    private TodoRepository todoRepository;

    public CategoryService(CategoryRepository categoryRepository, TodoRepository todoRepository) {
        this.categoryRepository = categoryRepository;
        this.todoRepository = todoRepository;
    }

    public Category create(CreateCategoryDTO data) throws ServiceValidationException {
         // Check if category already exists
        Optional<Category> existing = categoryRepository.findByCategoryName(data.getCategoryName());
        if (existing.isPresent()) {
           ValidationErrors errors = new ValidationErrors();
           errors.add("categoryName", "Category name already exists");
           throw new ServiceValidationException(errors);
        }

        Category category = new Category();
        category.setCategoryName(data.getCategoryName());
        return categoryRepository.save(category);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

     public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public Optional<Category> updateById(Long id, UpdateCategoryDTO data) {
        Optional<Category> found = categoryRepository.findById(id);
        if (found.isEmpty()) return Optional.empty();
        Category category = found.get();
        if (data.getCategoryName() != null) {
            category.setCategoryName(data.getCategoryName());
        }
        return Optional.of(categoryRepository.save(category));
    }

    @Transactional
    public Optional<Category> markArchived(Long id) {
       Optional<Category> found = categoryRepository.findById(id);

       if(found.isEmpty()) return Optional.empty();

       Category category = found.get();
        category.setIsArchived(true);
        categoryRepository.save(category);

        // Remove this category from all todos
        List<Todo> todosWithCategory = todoRepository.findAllByCategories_Id(id);
        for (Todo todo : todosWithCategory) {
            todo.getCategories().removeIf(cat -> cat.getId().equals(id));
            todoRepository.save(todo);
        }
        return Optional.of(category);
    }

}