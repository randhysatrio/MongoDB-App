const mongoose = require('mongoose');
const ConversationSchema = require('../models/Conversation');

module.exports = {
  postConversation: async (req, res) => {
    const newConversation = new ConversationSchema({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const response = await newConversation.save();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getConversation: async (req, res) => {
    try {
      const response = await ConversationSchema.find({ members: parseInt(req.params.id) });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
