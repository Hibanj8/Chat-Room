import User from './models/user.model.js';
import Message from './models/message.model.js';

export async function createUser(socket, userData) {
    try {
        const newUser = new User({
            pseudonyme: userData.pseudonyme,
        });
        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
}

export async function createMessage(socket, msg) {
    try {
        const newMessage = new Message({
            contenu: msg.message,
            auteur: msg.username,
        });
        await newMessage.save();
        console.log('Message saved:', newMessage);
    } catch (error) {
        console.error('Error saving message:', error.message);
    }
}