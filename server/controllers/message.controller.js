import Message from '../models/message.model.js';

const getMessage = async (req, res) => {
    try {
      // Les messages sont triés par ordre croissant en fonction de leur timestamp
      const messages = await Message.find().sort({ timestamp: 1 }); 
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
export default getMessage;