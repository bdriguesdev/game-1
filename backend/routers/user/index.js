const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const router = express.Router();

router.post('/user/create', async (req, res) => {
    const {email, userName, password} = req.body;
    
    if(email && userName && password) {
        //looking for any user(s) in the db that has the same email/username 
        let user = await User.find({ $or:[{ email },{ userName }] });
        //if doesnt exist any user with the same email/username the user.length is going to return 0 -> user returns []
        const hashedPassword = await bcrypt.hash(password, 12);
        if(user.length === 0) {
            //create and save the user in the db
            user = new User({
                email,
                userName,
                password : hashedPassword
            }).save();
            res.json({
                message: 'User created!',
                id: user.id,
                email,
                userName
            });
            await user.save();
        }
        //if already exists any user with the same email/username in the db
        res.json({
            error: "There's already a user registered with this email/username!"
        });
        return;
    }
    //if the user doesnt send a valid email/username/password
    res.json({
        error: "You need to send an valid email, username and password!"
    });
    return;
});

router.post('/user/characterslist', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId).populate('characters');
        if(!user) {
            res.json({
                error: 'This user doenst exist!'
            });
            return;
        }
        res.json(user.characters);
        return;
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;