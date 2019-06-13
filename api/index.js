const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/usersRouter');
 

const server = express();

server.use(helmet(), cors(), express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use('/users', userRouter);



module.exports = server;