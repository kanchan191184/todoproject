package io.nology.todoproject.todo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing Todo entities.
 * Extends JpaRepository to provide CRUD operations and custom query methods.
 */

public interface TodoRepository extends JpaRepository<Todo, Long> {

    /* Retrieves all non-archived todos.*/
    List<Todo> findByIsArchivedFalse();

    /* Retrieves all non-archived todos that belong to a specific category name.*/
    List<Todo> findByCategories_CategoryNameAndIsArchivedFalse(String CategoryName);

    /**
     * Retrieves all todos associated with a specific category ID.
     * (Used when deleting or updating a category). */
    List<Todo> findAllByCategories_Id(Long categoryId);

    /**
     * Retrieves all non-archived todos linked to non-archived categories by category name.
     * Useful when both the todo and its category should be active. */
    List<Todo> findByCategories_CategoryNameAndIsArchivedFalseAndCategories_IsArchivedFalse(String categoryName);
}
