package io.nology.todoproject.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todoproject.common.exceptions.NotFoundException;
import io.nology.todoproject.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public ResponseEntity<Category> create(@RequestBody CreateCategoryDTO data) throws ServiceValidationException {

        Category saved = this.categoryService.create(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAll() {
        List<CategoryDTO> allCategories = this.categoryService.findAll()
            .stream()
            .filter(cat -> !cat.getIsArchived())
            .map(cat -> new CategoryDTO(cat.getId(), cat.getCategoryName()))
            .collect(Collectors.toList());
        return new ResponseEntity<>(allCategories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id)
        throws NotFoundException {
        Optional<Category> foundCategory = this.categoryService.findById(id);
        if(foundCategory.isPresent()) {
            Category cat = foundCategory.get();
            return new ResponseEntity<>(new CategoryDTO(cat.getId(), cat.getCategoryName()), HttpStatus.OK);
            } 
        throw new NotFoundException("Category with id" + id + " not found");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@Valid @PathVariable Long id, @RequestBody UpdateCategoryDTO data) 
        throws NotFoundException {
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
