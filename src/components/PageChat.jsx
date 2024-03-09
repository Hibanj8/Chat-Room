import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';



function PageChat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = io('http://localhost:3000');
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const messagesContainerRef = useRef(null);

    const fetchInitialMessages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/messages');
            setMessages(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error loading initial messages:', error.message);
        }
    };

    useEffect(() => {
        fetchInitialMessages();

        // Écouter les nouveaux messages du serveur
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('disconnect', () => {
            // Gérer la redirection côté client
            window.location.href = '/SignUpForm';
        });

        // Nettoyer les écouteurs lorsque le composant est démonté
        return () => {
            socket.off('chat message');
            socket.off('disconnect');
        };
    }, [inputMessage]);

    useEffect(() => {
        // Faire défiler la partie des messages vers le bas à chaque mise à jour
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '') {
            socket.emit('chat message', { username, message: inputMessage });
            setInputMessage('');
        }
    };
    return (
        <div className="bg-gray-900 flex flex-col justify-between min-h-screen">
            {/* Contenu principal de la page */}
            <div><h1 className="font-mono self-center text-xl sm:text-3xl text-white flex items-center justify-center pt-7 ">Welcome to the Chat Room</h1></div>
            {/* Espace vide pour pousser le formulaire vers le bas */}
            <div className="mb-4 flex-grow py-6 px-96 text-nowrap">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2  rounded-l ${username === msg.auteur ? 'bg-blue-500 text-white ml-20  justify-end' : 'bg-gray-400 text-white mr-20'}`}>
                    <div className='text-black'>{new Date(msg.timestamp).getHours()}:{new Date(msg.timestamp).getMinutes()}</div>    {username !== msg.auteur && <strong className="text-blue-500">{msg.auteur}:</strong>} {msg.contenu} 
                    </div>
                ))}
            </div>
            {/* Formulaire pour saisir le message */}
            <div className="flex justify-center">
                <form onSubmit={handleSendMessage} className="max-w-2xl w-full">
                    <label htmlFor="chat" className="sr-only">Your message</label>
                    <div className="flex items-center py-2 px-3  rounded-lg bg-gray-700">
                        {/* ... (rest of your code) */}
                        <textarea
                            id="chat"
                            rows="1"
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}>
                        </textarea>
                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PageChat;
