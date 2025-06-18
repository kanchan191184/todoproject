package io.nology.todoproject.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.javafaker.Cat;

import io.nology.todoproject.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
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

        Category saved = this.categoryService.create(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
        // return ResponseEntity.ok(categoryService.create(data));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        // return ResponseEntity.ok(categoryService.findAll());

        List<Category> allCategories = this.categoryService.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id)
        throws NotFoundException {
        // return categoryService.findById(id).orElse(null);
        Optional<Category> foundCategory = this.categoryService.findById(id);
        if(foundCategory.isPresent()) {
            return new ResponseEntity<>(foundCategory.get(), HttpStatus.OK);
            } 
        throw new NotFoundException("Category with id" + id + " not found");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@Valid @PathVariable Long id, @RequestBody UpdateCategoryDTO data) 
        throws NotFoundException {
        // return categoryService.updateById(id, data)
        //     .map(ResponseEntity::ok)
        //     .orElse(ResponseEntity.notFound().build());

        Optional<Category> result = this.categoryService.updateById(id, data);
        Category updated = result.orElseThrow(
            () -> new NotFoundException("Could not update category with id " + id + ", it does not exist"));

            return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Category> markArchived(@PathVariable Long id) {
        return categoryService.markArchived(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
}
