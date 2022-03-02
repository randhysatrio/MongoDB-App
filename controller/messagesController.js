const MessageSchema = require('../models/Message');

module.exports = {
  postMessage: async (req, res) => {
    const newMessage = new MessageSchema({
      conversationId: req.body.conversationId,
      senderId: req.body.senderId,
      text: req.body.text,
    });
    try {
      const response = await newMessage.save();
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const response = await MessageSchema.find({ conversationId: req.params.id });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
