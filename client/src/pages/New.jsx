import React, { useState } from 'react';

import './New.scss'

const New = () => {
  // State variables for form inputs
  const [taskName, setTaskName] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Creating a new task object with form input values
    const newTask = {
      taskName,
      beginDate,
      endDate,
      comment,
    };
    // Saving the new task to local storage
    saveTaskToLocalStorage(newTask);
    // Resetting form inputs
    setTaskName('');
    setBeginDate('');
    setEndDate('');
    setComment('');
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
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Enter task Name'/>
      </div>
      <div>
        <label>Begin Date</label>
        <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
      </div>
      <div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter your Comments'/>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default New;
