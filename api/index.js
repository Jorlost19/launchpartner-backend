const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../routes/usersRouter');

const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer') ;
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const server = express();

server.use(helmet(), cors(), express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(methodOverride('_method'))

const mongoURI = `mongodb+srv://jorge:dXgwmoWW7nZsP23O@graphql-mongodb-vcif4.mongodb.net/mernstack?retryWrites=true&w=majority`;
conn = mongoose.createConnection(mongoURI,{ useNewUrlParser: true });

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('avatar')
})

const storage = new GridFSStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'avatar'
                };
                resolve(fileInfo);
            })
        })
    }
})

const upload = multer({ storage })

server.post('/upload', upload.single('image'), (req, res) => {
    res.json({file: req.file})
})

server.use('/users', userRouter);
server.get('/', (req, res) => {
    res.status(200).send('<h1>The API is running duh!</h1>')
})

module.exports = server;