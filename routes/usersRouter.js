const router = require('express').Router();
const User = require('../models/userSchema');

router.post('/register', (req, res) => {
    const user = new User({...req.body});
    user.save()
        .then(user => res.status(201).json({...user._doc, _id: user.id, password: null }))
        .catch(err => {
            console.error(err);
            throw err;
        })

}).get('/', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users.map(user => { return {...user._doc, _id: user.id, password: null}})))
        .catch(err => {
            console.error(err);
            throw err
        })
}).post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
        .then(user => {
            if(user) {
                res.status(200).json({...user._doc, _id: user.id, password: null})
            } else {
                res.status(400).json({message: 'Invalid credentials!'})
            }
        })
        .catch(err => {
            console.error(err);
            throw err
        })
})



module.exports = router;