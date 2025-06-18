package io.nology.todoproject.todo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByIsArchivedFalse();
    List<Todo> findByCategories_CategoryNameAndIsArchivedFalse(String CategoryName);
    List<Todo> findAllByCategories_Id(Long categoryId);
    List<Todo> findByCategories_CategoryNameAndIsArchivedFalseAndCategories_IsArchivedFalse(String categoryName);
}
