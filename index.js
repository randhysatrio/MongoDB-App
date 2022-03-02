require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_DB);

const { usersRouter, messagesRouter, conversationsRouter } = require('./router');

app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/conversations', conversationsRouter);

app.listen(PORT, () => {
  console.log('API Running at PORT', PORT);
});
