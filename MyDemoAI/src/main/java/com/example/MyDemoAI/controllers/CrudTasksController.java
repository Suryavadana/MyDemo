package com.example.MyDemoAI.controllers;

import com.example.MyDemoAI.models.CrudTasks;
import com.example.MyDemoAI.repositories.CrudTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class CrudTasksController {
    @Autowired
    CrudTasksRepository crudTasksRepository;

    // GET all tasks
    @GetMapping
    public List<CrudTasks> getAllTasks() {
        return (List<CrudTasks>) crudTasksRepository.findAll();
    }
    // GET task by ID
    @GetMapping("/{id}")
    public Optional<CrudTasks> getTaskById(@PathVariable int id) {
        return crudTasksRepository.findById(id);
    }

    // POST create a new task
    @PostMapping
    public CrudTasks createTask(@RequestBody CrudTasks task) {
        return crudTasksRepository.save(task);
    }

    // PUT update a task
    @PutMapping("/{id}")
    public CrudTasks updateTask(@PathVariable int id, @RequestBody CrudTasks updatedTask) {
        if (crudTasksRepository.existsById(id)) {
            updatedTask.setId(id); // Ensure the ID from path variable is set in the updated task
            return crudTasksRepository.save(updatedTask);
        } else {
            throw new RuntimeException("Task not found with id: " + id);
        }
    }

    // DELETE task by ID
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id) {
        crudTasksRepository.deleteById(id);
    }
}
