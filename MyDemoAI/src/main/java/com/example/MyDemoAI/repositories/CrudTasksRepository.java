package com.example.MyDemoAI.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.MyDemoAI.models.CrudTasks;

@Repository
public interface CrudTasksRepository extends CrudRepository<CrudTasks, Integer>{
}
