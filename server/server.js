import express, { json } from 'express';
import router from './routes/routes.js';
import { createServer } from 'http';
import { connect } from 'mongoose';
import cors from 'cors';
import { Server as socketIo } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);

const io = new socketIo(server, {
    cors: {
        origin: process.env.FRONTEND,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization'],
        credentials: true,
    },
});

app.use(cors({ origin: process.env.FRONTEND, }));
app.use(json());
app.use(router);



io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('edit', (content) => {
        io.emit('updateContent', content);
    });

    socket.on('bold', (isBold) => {
        io.emit('updateStyleBold', isBold);
    });

    socket.on('italic', (isItalic) => {
        io.emit('updateStyleItalic', isItalic);
    });

    socket.on('underline', (isUnderline) => {
        io.emit('updateStyleUnderline', isUnderline);
    });
    socket.on('joinWorkspace', (workspaceId) => {
        socket.join(workspaceId);
    });

    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        console.log('Workspace:', message.workspace);
        io.to(message.workspace).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5100;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default io;