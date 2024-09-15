import Message from '../models/message.js';
import io from '../server.js';

const sendMessage = async (req, res) => {
    const { content, workspace } = req.body;
    const senderId = req.user.id;

    try {
        let message = new Message({ content, sender: senderId, workspace });
        message = await message.save();

        message = await message.populate('sender', 'name');

        io.to(workspace).emit('message', message);
        res.status(201).json({ message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};



const getMessages = async (req, res) => {
    const { workspace } = req.query;
    try {
        const messages = await Message.find({ workspace }).populate('sender', 'name');
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

export { sendMessage, getMessages };