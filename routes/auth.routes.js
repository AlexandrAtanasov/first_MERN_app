const {Router} = require('express');
const router = Router();
const bcryptjs = require('bcryptjs');
const User = require('../Models/User');

// /api/auth/register
router.post('register', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) { 
            return res.status(400).json({ message: 'error, invalid user data, try again' });
        };

        const hashedPassword = await bcryptjs.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(200).json({ message: 'done! new user has been created!' })

    } catch (e) {
        res.status(500).json({ message: "error, try again" });
    }
});

// /api/auth/login
router.post('login', async (req, res) => {

});


module.exports = router