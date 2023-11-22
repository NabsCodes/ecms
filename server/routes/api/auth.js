const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Users Model
const User = require('../../models/User');
// getting the auth middleware
const { auth } = require('../../middleware/auth');


let FrontEnd = "";
const port = process.env.PORT || process.env.LocalPort;
{ process.env.LocalPort === port ? FrontEnd = process.env.FrontEndHost : FrontEnd = process.env.FrontEndHostProduction }

//@routes POST api/auth
//@desc Authenticate user
//@access Public
router.post('/', async (req, res) => {
    const { email, password } = req.body; // object destucturing

    //Simple Validation
    if (!email || !password) {
        return res.status(400).send({ msg: 'Please enter all fields', auth: false });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ msg: 'User Does Not Exist', auth: false });

        //Validating Password
        bcrypt.compare(password, user.password) //comparing passwords
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(401).send({ msg: 'Invalid Credentails', auth: false })
                };
                //isMatch is true 
                jwt.sign(
                    { id: user.id },
                    process.env.jwtSecret,
                    { expiresIn: 86400 },
                    (err, token) => {
                        if (err) throw err;
                        // res.json({
                        //     token,
                        //     user: {
                        //         id: user.id,
                        //         name: user.name,
                        //         email: user.email,
                        //         school_id: user.school_id,
                        //         phone: user.phone
                        //     }
                        // });
                        res.status(200).send({ 'auth': true, token });
                    }
                )
            })

    } catch (err) {
        res.status(500).json({ msg: err, auth: false })
    }
});


//@routes GET api/auth/user
//@desc Get user data
//@access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});


module.exports = router; 
