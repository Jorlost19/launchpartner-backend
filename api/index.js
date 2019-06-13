const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
 

const server = express();

server.use(helmet(), cors(), express.json())



module.exports = server;