const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const config = require('config');

// /api/auth/register
router.post(
    '/register', 

    [
        // check mail with built-in validator
        check('email', 'Email is incorrect').isEmail(),
        // check password with built-in validator
        check('password', 'Password is incorrect - minimum length is 6 characters').isLength({ min: 6 }),
    ],

    async (req, res) => {
        try {
            // validate incoming fields
            const errors = validationResult(req);

            // returning to front -  registration message error
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect registation data!'
                })
            };

            const {email, password} = req.body;
            const candidate = await User.findOne({ email });
            // check users data
            if (candidate) { 
                return res.status(400).json({ message: 'Such user already exists. Please, try again' });
            };
            // crypting users password
            const hashedPassword = await bcrypt.hash(password, 12);
            // creating new user
            const user = new User({ email, password: hashedPassword });
            await user.save();
            // tell to front what creating done
            res.status(200).json({ message: 'Done! New user has been created!' })
            
        } catch (e) {
            res.status(500).json({ message: "Error, try again" });
        }
    }
);



// /api/auth/login
router.post(
    '/login', 

    [
        // check mail with built-in validator
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        // check password with built-in validator
        check('password', 'Enter correct password').exists(),
    ],

    async (req, res) => {
        try {
            // validate incoming fields
            const errors = validationResult(req);

            // returning to front -  registration message error
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect registation data'
                })
            };

            // get from request user data
            const { email, password } = req.body;
            // find this one user in User
            const user = await User.findOne({ email });
            // if not find this ine user - return message
            if (!user) {
                res.status(400).json({ message: 'This users email is not find' });
            };
            // check password from front with db password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Incorrect password. Please, try again' }); 
            }

            // create token 
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                // token's lifetime
                { expiresIn: '1h' }
            );
            
            // default response status = 200
            res.json({ token, userId: user.id });
            
        } catch (e) {
            res.status(500).json({ message: "Error, try again" });
        }
    }
);


module.exports = router