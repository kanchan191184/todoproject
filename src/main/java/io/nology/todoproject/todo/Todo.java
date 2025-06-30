package io.nology.todoproject.todo;

import java.util.HashSet;
import java.util.Set;
import io.nology.todoproject.category.Category;
import jakarta.persistence.*;

// This class represents a Todo entity mapped to the "todos" table in the database.
@Entity
@Table(name = "todos")
public class Todo {

    // Primary key with auto-increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the todo - cannot be null
    @Column(nullable = false)
    private String name;

    // Indicates if the todo is completed
    private Boolean isCompleted;

    // Due date as a string (should ideally be stored as a LocalDate or Date)
    private String dueDate;

    // Soft delete flag to mark todos as archived instead of deleting them
    @Column(nullable = false)
    private Boolean isArchived = false;

    // Many-to-Many relationship with categories
    // Each todo can have multiple categories and each category can be linked to multiple todos
    // Data is fetched eagerly (all categories are loaded with the todo)

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "todo_categories",
        joinColumns = @JoinColumn(name = "todo_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )

    private Set<Category> categories = new HashSet<>();

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    public Set<Category> getCategories() { 
        return categories; 
    }
    public void setCategories(Set<Category> categories) { this.categories = categories; }
    public Boolean getIsArchived() { return isArchived; }
    public void setIsArchived(Boolean isArchived) { this.isArchived = isArchived; }
}