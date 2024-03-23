import React, { useState, useEffect } from 'react';
import './Tasks.scss';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});

  const fetchTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksWithId = storedTasks.map(task => ({ ...task, id: task.id }));
    setTasks(tasksWithId);
  };

  useEffect(() => {
    fetchTasksFromLocalStorage();
  }, []);

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

  const handleUndoTaskDone = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, done: false };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskContent = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, showFullContent: !task.showFullContent };
      } else {
        return { ...task, showFullContent: false };
      }
    });
    setTasks(updatedTasks);
    setSelectedTask(taskId);
  };

  const handleEditTaskDetails = (taskId, field, newValue) => {
    setEditedDetails(prevState => ({
      ...prevState,
      [field]: newValue
    }));
  };

  const handleSaveChanges = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === editMode) {
        return { ...task, ...editedDetails };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditMode(null);
  };

  const handleSaveTaskName = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask) {
        return { ...task, taskName: editedDetails.taskName || task.taskName };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className='tasks'>
      <h1>Task List</h1>
      <div className='tasksList'>
        {tasks.map(task => (
          <div className='tasksListDiv' key={task.id}>
            <label>
              <div className='tasksListDivTop'>                
              <input type="radio" checked={task.done} onChange={() => handleTaskDone(task.id)} />
              <p>{task.done ? "Completed" : "Pending"}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
              <div className='tasksListDivTop'>
              <button onClick={() => toggleTaskContent(task.id)}>More</button>
              <p onClick={() => setSelectedTask(task.id)}>{task.taskName}</p>
              </div>
              <div className='tasksListDivDataDate'>
                <p style={{fontSize:"15px", fontWeight:"550"}}>From: {task.beginDate}</p>
                <p style={{fontSize:"15px", fontWeight:"550"}}>To: {task.endDate}</p>
                </div>
            </label>

            {editMode === task.id && (
              <div>
                <input
                  type="text"
                  value={editedDetails.beginDate || task.beginDate}
                  onChange={(e) => handleEditTaskDetails(task.id, 'beginDate', e.target.value)}
                />
                <input
                  type="text"
                  value={editedDetails.endDate || task.endDate}
                  onChange={(e) => handleEditTaskDetails(task.id, 'endDate', e.target.value)}
                />
                <input
                  type="text"
                  value={editedDetails.comment || task.comment}
                  onChange={(e) => handleEditTaskDetails(task.id, 'comment', e.target.value)}
                />
                <button onClick={handleSaveChanges}>Save Changes</button>
              </div>
            )}

            {task.showFullContent && (
              <div className='tasksListDivData'>
                <input
                  type="text"
                  value={selectedTask === task.id ? editedDetails.taskName || task.taskName : task.taskName}
                  onChange={(e) => handleEditTaskDetails(task.id, 'taskName', e.target.value)}
                  onBlur={handleSaveTaskName}
                  autoFocus
                />

                

                
                <p style={{
                  backgroundColor:"#d1d1d1",
                  padding:"10px",
                  borderRadius:"13px"
                }}>{task.comment}</p>
                <div className='buttons'>
                  <button onClick={() => handleUndoTaskDone(task.id)}>Pending</button>
                  <button onClick={() => setEditMode(task.id)}>Edit</button>
                </div>
              </div>
              
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
