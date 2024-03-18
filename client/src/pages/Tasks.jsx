import React, { useState, useEffect } from 'react';
import './Tasks.scss';

import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Tasks = () => {
  // State variable to store tasks
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null)

  // Function to fetch tasks from local storage
  const fetchTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  };

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasksFromLocalStorage();
  }, []);

  // Function to handle marking a task as done
  const handleTaskDone = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, done: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to toggle display of full content for a task
  const toggleTaskContent = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, showFullContent: !task.showFullContent };
      } else {
        return { ...task, showFullContent: false }; // Close other tasks
      }
    });
    setTasks(updatedTasks);
  };

//   const selectedTask = ()

console.log();

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input type="radio" checked={task.done} onChange={() => handleTaskDone(task.id)} />
              {task.taskName}
            </label>
            {task.showFullContent && (
              <div>
                <p>Begin Date: {task.beginDate}</p>
                <p>End Date: {task.endDate}</p>
                <p>Comment: {task.comment}</p>
              </div>
            )}
            <button onClick={() => toggleTaskContent(task.id)}>
              {task.showFullContent ? <IoClose /> : <IoIosArrowForward /> }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
