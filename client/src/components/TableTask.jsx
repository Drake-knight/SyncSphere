import React, { useState, useEffect } from 'react';
import Select from 'react-select';  
import api from '../utils/axios';
import './TableTask.css';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'in-progress',
    dueDate: '',
    assignedTo: [],
    workspace: localStorage.getItem('selectedWorkspaceId') || '',
  });

  const workspaceId = localStorage.getItem('selectedWorkspaceId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/workspace', {
          params: { workspace: workspaceId },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();

    const fetchMembers = async () => {
      try {
        if (workspaceId) {
          const response = await api.get('/workspace/members', {
            params: { workspaceId }  
          });
          setMembers(response.data.members);
        } else {
          console.error('No workspace ID found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAssignedToChange = (selectedOptions) => {
    const selectedMemberIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewTask((prevTask) => ({
      ...prevTask,
      assignedTo: selectedMemberIds,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const workspaceId = localStorage.getItem('selectedWorkspaceId');
    
    const taskWithWorkspace = {
        ...newTask,
        workspace: workspaceId,
    };

    try {
      const response = await api.post('/tasks', taskWithWorkspace);

      const updatedTask = {
        ...response.data.task,
        assignedTo: response.data.task.assignedTo.map(memberId => 
          members.find(member => member._id === memberId) || memberId
        )
      };

      setTasks((prevTasks) => [...prevTasks, updatedTask]);
      setNewTask({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        assignedTo: [],
        workspace: '',
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
};

  const toggleStatus = async (taskId, currentStatus) => {
    const updatedStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: updatedStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: response.data.task.status } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
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
                <td>
                  {task.assignedTo.map(member => member.name || member).join(', ')}
                </td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => toggleStatus(task._id, task.status)}>
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
            <div>
              <select name="status" value={newTask.status} onChange={handleInputChange}>
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
            <Select
  isMulti
  name="assignedTo"
  options={members.map((member) => ({ value: member._id, label: member.name }))}
  value={members.filter(member => newTask.assignedTo.includes(member._id)).map(member => ({
    value: member._id,
    label: member.name,
  }))}
  onChange={handleAssignedToChange}
  placeholder="Select members..."
  className="basic-multi-select"
  classNamePrefix="select"
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: '#343849', 
      border: '1px solid #ccc',
      boxShadow: 'none',
      padding: '5px',
      color: 'white',
      '&:hover': {
        borderColor: '#888',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', 
    }),
    input: (provided) => ({
      ...provided,
      color: 'white', 
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '10px',
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#e0e0e0' : '#fff',
      color: state.isSelected ? 'white' : 'black',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: '12px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: '#ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#888',
        color: 'white',
      },
    }),
  }}
/>



          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskTable;
