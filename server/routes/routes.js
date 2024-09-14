import { Router } from 'express';
import { createWorkspace, inviteUser, listWorkspaces, joinWorkspace, getAllMembers } from '../controllers/workspace.js';
import { registerUser, loginUser } from '../controllers/auth.js';
import { createTask, getTasks, updateTask, deleteTask, getTasksByWorkspace } from '../controllers/task.js';
import { sendMessage, getMessages } from '../controllers/message.js';
import auth from '../middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/workspace/create', auth, createWorkspace);
router.post('/workspace/invite', auth, inviteUser);
router.post('/workspace/join', joinWorkspace);
router.get('/workspace/list', auth, listWorkspaces);
router.get('/workspace/members', auth, getAllMembers);

router.post('/tasks', auth, createTask);
router.get('/tasks', auth, getTasks);
router.get('/tasks/workspace', auth, getTasksByWorkspace);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);


router.post('/messages', auth, sendMessage);
router.get('/messages', auth, getMessages);
export default router;

