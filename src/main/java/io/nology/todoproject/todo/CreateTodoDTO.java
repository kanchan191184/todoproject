package io.nology.todoproject.todo;

import jakarta.validation.constraints.NotBlank;

public class CreateTodoDTO {

    @NotBlank(message = "Name must not be blank")
    private String name;

    private Boolean isCompleted;

    @NotBlank
    private String dueDate;

    private String[] categories;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public String[] getCategories() { return categories; }
    public void setCategories(String[] categories) { this.categories = categories; }
}