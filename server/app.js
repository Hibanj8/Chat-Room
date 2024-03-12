import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { createUser, createMessage } from './utils.js';
import messageRoutes from './routes/message.route.js';
const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 6001; 

const startserver = async () =>{
    try{ 
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connection to the database successful");
    }catch(error){ 
        console.log(error.message);
    }
}
startserver();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use('/api', messageRoutes);

const server = http.createServer(app);

// Création d'une instance de Socket.IO et configuration des paramètres CORS

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: false,
    } 
});


// Gestion des événements de connexion et de déconnexion des utilisateurs via Socket.IO

io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('create user', async (userData) => {
        createUser(socket, userData);
    });

    socket.on('chat message', async (msg) => {
        createMessage(socket, msg);
        io.emit('chat message', msg);
      });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});