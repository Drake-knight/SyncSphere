import Workspace from '../models/workspace.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';


const createWorkspace = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const workspace = new Workspace({
            name,
            owner: userId,
            users: [userId],
        });
        await workspace.save();
        res.status(201).json({ workspace });
    } catch (error) {
        res.status(500).json({ message: 'Error creating workspace' });
    }
};

const inviteUser = async (req, res) => {
    const { workspaceId, email } = req.body;

    if (!workspaceId || !email) {
        return res.status(400).json({ message: 'Workspace ID and email are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        if (workspace.users.includes(user._id)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        const token = jwt.sign({ workspaceId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const invitationLink = `${process.env.FRONTEND_URL}/join-workspace?token=${token}`;


        res.status(200).json({ message: 'Invitation link sent', invitationLink });
    } catch (error) {
        res.status(500).json({ message: 'Error inviting user' });
    }
};

const joinWorkspace = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { workspaceId, email } = decoded;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        if (workspace.users.includes(user._id)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        workspace.users.push(user._id);
        await workspace.save();

        res.status(200).json({ message: 'Successfully joined the workspace' });
    } catch (error) {
        res.status(500).json({ message: 'Error joining workspace' });
    }
};
const listWorkspaces = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);

    try {
        const workspaces = await Workspace.find({ users: userId });
        console.log(workspaces);
        res.status(200).json({ workspaces });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspaces' });
    }
};

const getAllMembers = async (req, res) => {
    const { workspaceId } = req.query;

    try {
        const workspace = await Workspace.findById(workspaceId).populate('users');
        res.status(200).json({ members: workspace.users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching members' });
    }
};

export { createWorkspace, inviteUser, joinWorkspace, listWorkspaces, getAllMembers };