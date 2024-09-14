import Message from '../models/message.js';

import io from '../server.js';

const sendMessage = async (req, res) => {
    const { content, workspace } = req.body;
    console.log(content, workspace);
    const sender = req.user.id;
    try {
        const message = new Message({ content, sender, workspace });
        await message.save();
        io.to(workspace).emit('message', message);
        res.status(201).json({ message });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
};


const getMessages = async (req, res) => {
    const { workspace } = req.query;
    try {
        const messages = await Message.find({ workspace })
            .populate('sender')
            .sort({ timestamp: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

export { sendMessage, getMessages };