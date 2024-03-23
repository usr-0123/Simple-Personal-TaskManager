import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

import './New.scss';

const New = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State variables for form inputs
  const [taskName, setTaskName] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Generating a unique task ID
    const taskID = uuidv4();

    // Creating a new task object with form input values and task ID
    const newTask = {
      
      id: taskID, // Include taskID in the new task object
      taskName,
      beginDate,
      endDate,
      comment,
    };

    // Check if the task with the same ID already exists
    if (!isTaskIdUnique(taskID)) {
      alert('Task with the same ID already exists. Please try again.');
      return;
    }

    // Saving the new task to local storage
    saveTaskToLocalStorage(newTask);

    // Resetting form inputs
    setTaskName('');
    setBeginDate('');
    setEndDate('');
    setComment('');

    // Redirect to the Tasks component
    navigate('/tasks');
  };

  // Function to check if the task ID is unique
  const isTaskIdUnique = (id) => {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return !existingTasks.some(task => task.id === id);
  };

  // Function to save task to local storage
  const saveTaskToLocalStorage = (task) => {

    // Retrieve existing tasks from local storage or initialize as an empty array
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the array
    existingTasks.push(task);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
  };

  return (
    <>
      <h1>Add a new task</h1>
      <form onSubmit={handleSubmit} className='newTaskForm'>
        <div className='newTaskFormName'>
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Enter task Name'/>
        </div>
        <div className='newTaskFormDates'>
          <div className='newTaskFormDatesContainer'>
            <label>Begin Date</label>
            <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />
          </div>
          <div className='newTaskFormDatesContainer'>
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
          </div>
        </div>
        <div className='newTaskFormComments'>
          <input className='newTaskFormCommentsInput' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter your Comments'/>
        </div>
        <button className='button' type="submit">Add Task</button>
      </form>
    </>
  );
};

export default New;
