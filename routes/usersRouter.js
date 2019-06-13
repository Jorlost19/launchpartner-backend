const router = require('express').Router();
const User = require('../models/userSchema');

router.post('/register', (req, res) => {
    const user = new User({...req.body});
    user.save()
        .then(user => res.status(201).json({...user._doc, _id: user.id }))
        .catch(err => {
            console.error(err);
            throw err;
        })

})

module.exports = router;