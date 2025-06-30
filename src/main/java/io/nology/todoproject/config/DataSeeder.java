package io.nology.todoproject.config;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.nology.todoproject.category.Category;
import io.nology.todoproject.category.CategoryRepository;
import io.nology.todoproject.todo.Todo;
import io.nology.todoproject.todo.TodoRepository;


/**
 * DataSeeder is a configuration class responsible for populating the database
 * with initial sample data at application startup.
*/
@Configuration
public class DataSeeder {
    
     /**
     * Seeds the database with predefined categories and todos using Spring Boot's CommandLineRunner.
     * This runs once the application context has fully initialized.
     */
    @Bean
    CommandLineRunner seedDatabase(CategoryRepository categoryRepository, TodoRepository todoRepository) {
        return args -> {

            // Clear all existing data to avoid duplication on restart
            todoRepository.deleteAll();
            categoryRepository.deleteAll();

                 // --- Create Category Entities ---
                Category work = new Category();
                work.setCategoryName("Work");
                Category home = new Category();
                home.setCategoryName("Home");
                Category urgent = new Category();
                urgent.setCategoryName("Urgent");

                // ✅ Save categories to DB
                categoryRepository.saveAll(Arrays.asList(work, home, urgent));

                // --- Create Todo 1 ---
                Todo todo1 = new Todo();
                todo1.setName("Finish Spring Boot project");
                todo1.setDueDate("2025-07-01");
                todo1.setIsCompleted(false);
                todo1.setIsArchived(false);
                todo1.setCategories(new HashSet<>(Arrays.asList(work, urgent)));

                // --- Create Todo 2 ---
                Todo todo2 = new Todo();
                todo2.setName("Buy groceries");
                todo2.setDueDate("2025-07-02");
                todo2.setIsCompleted(false);
                todo2.setIsArchived(false);
                todo2.setCategories(new HashSet<>(Arrays.asList(home)));

                // ✅ Save sample todos
                todoRepository.saveAll(Arrays.asList(todo1, todo2));
            };
        }
}
