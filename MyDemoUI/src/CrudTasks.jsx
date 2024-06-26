// import React, { useState } from "react";
// import axios from "axios";
// const CrudTasks=() => {

//     //State to manage Tasks
//     const[task , setTask] = useState([]);
//     const[newTask, setNewTask] = useState({id: '', name: '', assigned: '' });
//     const[updateTask, setUpdateTask]= useState(false);


// //     //Function to add new task

// //     const addTask =()=> {
// //         //all fields required
// //         if(!newTask.id || !newTask.name || !newTask.assigned){
// //             alert("All fields are required.")
// //             return;
// //         }
// //         // If updateTask is true, we are editing an existing task
// //         if (updateTask) {
// //         // Find the index of the task to update in the tasks array
// //             const index = task.findIndex(task => task.id === newTask.id);
// //             if (index === -1) {
// //                 alert("Task not found for update.");
// //                 return;
// //             }
// //             // Update the task at the found index
// //             task[index] = { ...newTask };
// //             setTask([...task]);
// //             setUpdateTask(false); // Reset updateTask state
// //             alert('Task updated successfully!');
// //             }
// //             else {
// //             // Add new task to array
// //             setTask([...task, newTask]);
// //             alert('Task added successfully!');
// //         }
  
// //         // //add new task to array
// //         // setTask ([...task, newTask]);

// //         //clear the new task fields after adding
// //         setNewTask({id:'', name:'', assigned:''});

// //         // // Optionally, you can do something after adding the task (e.g., show a success message)
// //         // alert('Task added successfully!');
// //     };

// //     // Function to delete a task
// //     const deleteTask = id => {
// //     const updatedTasks = task.filter(task => task.id !== id);
// //     setTask(updatedTasks);
// //     };

// //     // Function to set the task to edit mode
// //     const editTask = task => {
// //     setNewTask({ ...task });
// //     setUpdateTask(true); // Set updateTask to true to indicate editing mode
// //     };



// //     return(
// //         <div className="container mt-4">
// //         <div className="form-group">
// //             <h2>CRUD OPERATIONS</h2>
// //             <label htmlFor="taskId">ID
// //                 <input type="text"
// //                     className="form-control" 
// //                     id="taskId"
// //                     value={newTask.id}
// //                     onChange={e => setNewTask({ ...newTask, id: e.target.value })}  
// //                     required/>
// //             </label>
// //             <label  htmlFor="taskName">Name
// //                 <input type="text" 
// //                     className="form-control"  
// //                     id="taskName"
// //                     value={newTask.name}
// //                     onChange={e => setNewTask({ ...newTask, name: e.target.value })}
// //                     required/>
// //             </label>
// //             <label  htmlFor="taskAssigned">Assigned 
// //                 <input type="text"
// //                     className="form-control"
// //                     id="taskAssigned"
// //                     value={newTask.assigned}
// //                     onChange={e => setNewTask({ ...newTask, assigned: e.target.value })} 
// //                     required/></label> 
// //             <button className="btn btn-primary mb-3" onClick={addTask} >Add Task</button>
// //             {/* <button className="btn btn-primary mb-3" onClick={() => deleteTask(newTask.id)}>Delete Task</button> */}
// //         </div>
// //         {/* Display tasks */}
// //         <div>
// //         <h3>Tasks List</h3>
// //         <table className="table">
// //             <thead>
// //             <tr>
// //                 <th>ID</th>
// //                 <th>Name</th>
// //                 <th>Assigned</th>
// //             </tr>
// //             </thead>
// //             <tbody>
// //             {task.map((task, index) => (
// //                 <tr key={index}>
// //                 <td>{task.id}</td>
// //                 <td>{task.name}</td>
// //                 <td>{task.assigned}</td>
// //                 <td>
// //                 <button className="btn btn-primary btn-sm mr-2" onClick={() => editTask(task)}>Edit</button>
// //                 <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
// //                 </td>
// //                 </tr>
            
// //             ))}
// //             </tbody>
// //         </table>
      
// //          </div>
        
// //          </div>
// //     );
//  };


  

// export default CrudTasks;

import React, { useState, useEffect } from "react";
import axios from "axios";

const CrudTasks = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks fetched from backend
  const [newTask, setNewTask] = useState({ id: "", name: "", assigned: "" }); // State for new task or task being edited
  const [updateTask, setUpdateTask] = useState(false); // State to indicate if we are updating an existing task

  // useEffect to fetch tasks from backend when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data); // Set tasks array with data fetched from backend
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to add or update a task
  const addTask = async () => {
    try {
      // Check if all fields are filled
      if (!newTask.id || !newTask.name || !newTask.assigned) {
        alert("All fields are required.");
        return;
      }

      if (updateTask) {
        // If updateTask is true, update existing task
        await axios.put(`http://localhost:8080/api/tasks/${newTask.id}`, newTask);
        alert("Task updated successfully!");
      } else {
        // Otherwise, add new task
        await axios.post("http://localhost:8080/api/tasks", newTask);
        alert("Task added successfully!");
      }

      // Clear input fields and reset updateTask state
      setNewTask({ id: "", name: "", assigned: "" });
      setUpdateTask(false);

      // Refresh tasks list after adding/updating
      fetchTasks();
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      alert("Task deleted successfully!");
      // Refresh tasks list after deletion
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to set the task to edit mode
  const editTask = (task) => {
    setNewTask({ ...task });
    setUpdateTask(true); // Set updateTask to true to indicate editing mode
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <h2>CRUD OPERATIONS</h2>
        <label htmlFor="taskId">
          ID
          <input
            type="text"
            className="form-control"
            id="taskId"
            value={newTask.id}
            onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
            required
          />
        </label>
        <label htmlFor="taskName">
          Name
          <input
            type="text"
            className="form-control"
            id="taskName"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            required
          />
        </label>
        <label htmlFor="taskAssigned">
          Assigned
          <input
            type="text"
            className="form-control"
            id="taskAssigned"
            value={newTask.assigned}
            onChange={(e) =>
              setNewTask({ ...newTask, assigned: e.target.value })
            }
            required
          />
        </label>
        <button className="btn btn-primary mb-3" onClick={addTask}>
          {updateTask ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Display tasks */}
      <div>
        <h3>Tasks List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Assigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.assigned}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudTasks;
