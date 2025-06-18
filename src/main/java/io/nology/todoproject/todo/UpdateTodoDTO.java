package io.nology.todoproject.todo;

import jakarta.validation.constraints.Pattern;

public class UpdateTodoDTO {

    @Pattern(regexp = ".*\\S.*", message = "Name must not be blank")
    
    private String name;
    private Boolean isCompleted;
    private String dueDate; // Assuming date is in ISO format (e.g., "2023-10-01")
    private String[] categories; // Assuming categories are passed as an array of strings

    public String getName() {
        return name;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public String getDueDate() {
        return dueDate;
    }

    public String[] getCategories() {
        return categories;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public void setCategories(String[] categories) {
        this.categories = categories;
    }
    
}
