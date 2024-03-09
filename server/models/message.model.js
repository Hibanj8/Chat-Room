import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  contenu: { 
    type: String, 
    required: true 
  },
  auteur: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now, 
    required: true 
},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;