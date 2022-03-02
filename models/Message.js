const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Messages', messageSchema);
