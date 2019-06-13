const router = require('express').Router();
const User = require('../models/userSchema');
const { isLoggedIn, isValidEmail, isValidPassword } = require('../middlewares');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'What a secret!';

const generateToken = user => {
    const payload = {
        ...user
    };
    console.log(user)
    const options = {
      expiresIn: '1h',
      jwtid: bcrypt.hashSync(user.name, 4),
      subject: `${user._id}`
    };
    return jwt.sign(payload, secret, options);
  };

router.post('/register', isValidEmail, isValidPassword, (req, res) => {
    const user = new User({...req.body});
    user.save()
        .then(user => res.status(201).json({token: generateToken({...user._doc, _id: user.id, password: null}),
                                             user: {...user._doc, _id: user.id, password: null}       
                                                            }))
        .catch(err => {
            console.error(err);
            throw err;
        })

}).get('/', isLoggedIn, (req, res) => {
    User.find()
        .then(users => res.status(200).json(users.map(user => { return {...user._doc, _id: user.id, password: null}})))
        .catch(err => {
            console.error(err);
            throw err
        })
}).post('/login', isValidEmail, isValidPassword, (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
        .then(user => {
            if(user) {
                res.status(200).json({token: generateToken({...user._doc, _id: user.id, password: null}),
                                      user: {...user._doc, _id: user.id, password: null}
                                    })
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