import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;