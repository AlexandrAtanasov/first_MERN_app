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
        check('email', 'email is incorrect').isEmail(),
        // check password with built-in validator
        check('password', 'password is incorrect - minimum length is 6 characters').isLength({ min: 6 }),
    ],

    async (req, res) => {
        try {
            // validate incoming fields
            const errors = validationResult(req);

            // returning to front -  registration message error
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'incorrect registation data'
                })
            };

            const {email, password} = req.body;
            const candidate = await User.findOne({ email });
            // check users data
            if (candidate) { 
                return res.status(400).json({ message: 'error, invalid user data, try again' });
            };
            // crypting users password
            const hashedPassword = await bcrypt.hash(password, 12);
            // creating new user
            const user = new User({ email, password: hashedPassword });
            await user.save();
            // tell to front what creating done
            res.status(200).json({ message: 'done! new user has been created!' })
            
        } catch (e) {
            res.status(500).json({ message: "error, try again" });
        }
    }
);



// /api/auth/login
router.post(
    '/login', 

    [
        // check mail with built-in validator
        check('email', 'enter correct email').normalizeEmail().isEmail(),
        // check password with built-in validator
        check('password', 'enter correct password').exists(),
    ],

    async (req, res) => {
        try {
            // validate incoming fields
            const errors = validationResult(req);

            // returning to front -  registration message error
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'incorrect registation data'
                })
            };

            // get from request user data
            const { email, password } = req.body;
            // find this one user in User
            const user = await User.findOne({ email });
            // if not find this ine user - return message
            if (!user) {
                res.status(400).json({ message: 'this users email is not find' });
            };
            // check password from front with db password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'incorrect password, please try again' }); 
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
            res.status(500).json({ message: "error, try again" });
        }
    }
);


module.exports = router