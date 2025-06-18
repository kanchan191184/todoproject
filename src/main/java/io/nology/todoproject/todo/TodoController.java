package io.nology.todoproject.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

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
    public ResponseEntity<Todo> create(@RequestBody CreateTodoDTO data) {
        return ResponseEntity.ok(todoService.create(data));
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAll(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(todoService.findAll(category));
    }

    @GetMapping("/{id}")
        public Todo getById(@PathVariable Long id) {
        return todoService.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody UpdateTodoDTO data) {
        return ResponseEntity.ok(todoService.updateById(id, data));
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
