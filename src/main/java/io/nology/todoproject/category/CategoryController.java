package io.nology.todoproject.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @PostMapping
    public ResponseEntity<Category> create(@RequestBody CreateCategoryDTO data) {
        return ResponseEntity.ok(categoryService.create(data));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
        public Category getById(@PathVariable Long id) {
        return categoryService.findById(id).orElse(null);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody UpdateCategoryDTO data) {
        return categoryService.updateById(id, data)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Category> markArchived(@PathVariable Long id) {
        return categoryService.markArchived(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
}
