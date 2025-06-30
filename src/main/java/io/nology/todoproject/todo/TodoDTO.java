package io.nology.todoproject.todo;

import java.util.List;

import io.nology.todoproject.category.CategoryDTO;

public class TodoDTO {
    private Long id;
    private String name;
    private String dueDate;
    private boolean isCompleted;
    private boolean isArchived;
    private List<CategoryDTO> categories;

    public TodoDTO(Long id, String name, String dueDate, boolean isCompleted, boolean isArchived, List<CategoryDTO> categories) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
        this.isArchived = isArchived;
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDueDate() {
        return dueDate;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public boolean getIsArchived() {
        return isArchived;
    }

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    
}