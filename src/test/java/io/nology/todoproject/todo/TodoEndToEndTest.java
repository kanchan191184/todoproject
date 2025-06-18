package io.nology.todoproject.todo;

import java.util.ArrayList;
// import java.util.HashSet;
// import java.util.Set;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import io.restassured.RestAssured;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import io.restassured.http.ContentType;

import static org.hamcrest.Matchers.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TodoEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TodoRepository todoRepository;

    private ArrayList<Todo> todos = new ArrayList<>();

    @BeforeEach
    public void setup() {
        RestAssured.port = this.port;

        this.todoRepository.deleteAll();
        this.todos.clear();

        Todo todo1 = new Todo();
        todo1.setName("Create Portfolio");
        todo1.setDueDate("2025-06-30");
        // Category is an array of strings
        // Set<String> categories = new HashSet<>();
        // categories.add("HTML");
        // todo1.setCategories(categories);
        todo1.setIsCompleted(false);
        this.todoRepository.save(todo1);
        this.todos.add(todo1);

        Todo todo2 = new Todo();
        todo2.setName("Create Fullstack Project");
        todo2.setDueDate("2025-07-03");
        todo2.setIsCompleted(false);
        this.todoRepository.save(todo2);
        this.todos.add(todo2);
    }

    //test for GET /todos
    @Test
    public void getAllTodos_TodosInDB_ReturnsSuccess() {
        // Arrange
        // Act

        given()
            .when().get("/todos")
            .then().statusCode(HttpStatus.OK.value())
            .body("$", hasSize(2))
            .body("name",
                hasItems("Create Portfolio", "Create Fullstack Project"));
        
    }

    @Test
    public void getAllTodos_NoTodosInDB_ReturnsSuccessAndEmptyArray() {
        this.todoRepository.deleteAll();
        given()
                .when().get("/todos")
                .then().statusCode(HttpStatus.OK.value())
                .body("$", hasSize(0));

    }

    @Test
    public void getById_InvalidID_BadRequest() {
        given()
                .when()
                .get("todos/gfiakrnoaoe")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void getById_IDNotInDB_NotFound() {
        Long largeID = 9746829100l;
        given()
            .when()
            .get("todos/" + largeID)
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void getByID_IDInDB_Success() {
        Long existingId = this.todos.get(0).getId();

        given()
            .when()
            .get("/todos/" + existingId)
            .then()
            .statusCode(HttpStatus.OK.value())
            .body("name", equalTo("Create Portfolio"));

    }

    // POST /todos

    @Test
    public void createTodo_WhenPassedValidData_Created() {

        // String todoJson = """
        // {
        // "name": "Update Project",
        // "dueDate": "2025-07-14",
        // "isCompleted": false,
        // "categories": ["ReactJs"]
        // }
        // """;

        Map<String, Object> data = new HashMap<>();
        data.put("name", "Update Project");
        data.put("dueDate", "2025-07-14");
        data.put("isCompleted", false);
        data.put("categories", List.of("ReactJs"));

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("name", equalTo("Update Project"));

    }

       // bad request

    @Test
    public void createTodo_InvalidData_BadRequest() {
        Map<String, Object> data = new HashMap<>();
        data.put("name", "Create New Project");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createTodo_EmptyRequestBody_BadRequest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createTodo_InvalidRequestBodyType_UnsupportedMediaType() {
        given()
                .contentType(ContentType.TEXT)
                .when()
                .post("/todos")
                .then()
                .statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }

}
