import React, { useState, useEffect } from 'react';
import './TableTask.css';
import { fetchTasks, addTask } from './api';
import Sidebar from './Sidebar';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    assignedTo: '',
    workspace: '',
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    getTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedTask = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTask({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        assignedTo: '',
        workspace: '',
      });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleStatus = async (taskId) => {
    // Implement status update logic if needed
  };

  return (
    <div className="task-table-container">
      <div>
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Assigned To</th>
              <th>Workspace</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className={`status ${task.status}`}>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.assignedTo}</td>
                <td>{task.workspace}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => toggleStatus(task._id)}>
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <div >
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            </div>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleInputChange}
              placeholder="Assigned To"
            />
            <input
              type="text"
              name="workspace"
              value={newTask.workspace}
              onChange={handleInputChange}
              placeholder="Workspace"
              required
            />
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskTable;
