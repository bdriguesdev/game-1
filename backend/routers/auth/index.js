const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const router = express.Router();

router.post('/login', async (req,res)  => {
    const { email, password } = req.body;
    if(!email || !password ) {
        res.json({
            error: 'You need to send an valid email/password!1',
        });
        return;
    }   
    const user = await User.findOne({email});
    if(!user) {
        res.json({
            error: 'You need to send an valid email/password!2'
        });
        return;
    }
    // const isPasswordEqual = await bcrypt.compare(password, user.password);
    const isPasswordEqual = password === user.password;
    if(!isPasswordEqual) {
        res.json({
            error: 'You need to send an valid email/password!3'
        });
        return;
    }
    const token = jwt.sign({userId: user.id}, 'supersecretkey');
    res.json({
        userId: user.id,
        token: token,
        userInfo: { characters: user.characters, userName: user.userName }
    });
    return;
});

module.exports = router;