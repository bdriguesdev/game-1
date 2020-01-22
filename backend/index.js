const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routers/user/index');
const authRouter = require('./routers/auth/index');
const huntRouter = require('./routers/hunt/index');
const characterRouter = require('./routers/character/index');
const battleRouter = require('./routers/battle/index');
const isAuth = require('./routers/authorization/index');
const inventoryRouter = require('./routers/inventory/index');
const shopRouter = require('./routers/shop/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(userRouter);
app.use(authRouter);
app.use('/inventory', inventoryRouter);
app.use('/hunt', huntRouter);
app.use('/character', characterRouter);
app.use('/battle', battleRouter);
app.use('/shop', shopRouter);

// `mongodb+srv://brunoadmin:5vnRApbWZzfio6Hh@cluster0-utmwr.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect('mongodb+srv://brunoadmin:5vnRApbWZzfio6Hh@cluster0-utmwr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } )
    .then(() => {
        console.log('Connected with MongoDBCloud!')
        app.listen(8000, () => {
            console.log('The server is up and running!');
        })
    }).catch(err => {
        console.log(err);
    });
