package io.nology.todoproject.category;

import jakarta.validation.constraints.NotBlank;

public class UpdateCategoryDTO {
    
    @NotBlank
    private String categoryName;
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
}
