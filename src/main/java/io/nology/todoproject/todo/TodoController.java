package io.nology.todoproject.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todoproject.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private TodoService todoService;

    TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @PostMapping
    public ResponseEntity<Todo> create(@Valid @RequestBody CreateTodoDTO data) {
        Todo saved = this.todoService.create(data);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
        // return ResponseEntity.ok(todoService.create(data));
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAll(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(todoService.findAll(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable Long id) throws NotFoundException {
        // return todoService.findById(id).orElse(null);
        Optional<Todo> foundTodo = this.todoService.findById(id);
        if(foundTodo.isPresent()) {
            return new ResponseEntity<>(foundTodo.get(), HttpStatus.OK);
        }
        throw new NotFoundException("Todo with id " + id + " doesn't exist");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@Valid @PathVariable Long id, @RequestBody UpdateTodoDTO data)
    throws NotFoundException {
        // return ResponseEntity.ok(todoService.updateById(id, data));

        Optional<Todo> result = this.todoService.updateById(id, data);
        
        Todo updated = result.orElseThrow(
            () -> new NotFoundException("Could not update todo with id " + id + ", because it does not exist"));
        
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Todo> markComplete(@PathVariable Long id) {
        return todoService.markComplete(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Todo> markArchived(@PathVariable Long id) {
        return todoService.markArchived(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
    
}
