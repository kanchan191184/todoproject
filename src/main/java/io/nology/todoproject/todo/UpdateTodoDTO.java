package io.nology.todoproject.todo;

import jakarta.validation.constraints.NotBlank;

public class UpdateTodoDTO {

    @NotBlank(message= "Name must not be blank")
    private String name;

    private Boolean isCompleted;

    @NotBlank(message = "Due date must not be blank")
    private String dueDate; 

    private String[] categories;

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
