import Task from '../models/tasks.js';

const createTask = async (req, res) => {
    const { title, description, status, dueDate, assignedTo, workspace } = req.body;
    try {
        const task = new Task({ title, description, status, dueDate, assignedTo, workspace });
        await task.save();
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};


const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Task.find({ assignedTo: userId }).populate('assignedTo workspace');
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const getTasksByWorkspace = async (req, res) => {
    const { workspace } = req.query;
    try {
        const tasks = await Task.find({ workspace }).populate('assignedTo workspace');
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks by workspace' });
    }
};

const updateTask = async (req, res) => {
    const { title, description, status, dueDate, assignedTo, workspace } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, dueDate, assignedTo, workspace },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

export { createTask, getTasks, updateTask, deleteTask, getTasksByWorkspace };