const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/usersRouter');
 

const server = express();

server.use(helmet(), cors(), express.json())
server.use('/users', userRouter);



module.exports = server;