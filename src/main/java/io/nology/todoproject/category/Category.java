package io.nology.todoproject.category;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.nology.todoproject.todo.Todo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String categoryName;

    @Column(nullable = false)
    private Boolean isArchived = false;

    public Boolean getIsArchived() {
        return isArchived;
    }
    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }
    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Todo> todos;

    
    public Category() {}
    public Category(String categoryName) { this.categoryName = categoryName; }
    
    // Getters and setters
    public Long getId() { return id; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public Set<Todo> getTodos() { return todos; }
    public void setTodos(Set<Todo> todos) { this.todos = todos; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id != null && id.equals(category.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
