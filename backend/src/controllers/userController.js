const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.updateProfile = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
