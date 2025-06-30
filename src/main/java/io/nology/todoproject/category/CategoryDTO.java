package io.nology.todoproject.category;

public class CategoryDTO {

    private Long id;
    private String categoryName;

    public CategoryDTO(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public Long getId() { return id; }
    public String getCategoryName() { return categoryName; }

    public String getColorClass() {
        // Use Java's built-in hashCode for better distribution
        int hash = categoryName.hashCode();
        int hue = Math.abs(hash) % 360;
        
        // Optionally, vary saturation and lightness for more distinction
        int saturation = 40 + Math.abs(hash / 3 ) % 21; // 40% - 60%
        int lightness = 80 + Math.abs(hash / 5) % 11; // 80% - 90%
        return String.format("hsl(%d, %d%%, %d%%)", hue, saturation, lightness);
    }
}
