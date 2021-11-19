const express = require('express');
const router = express.Router();
const axios = require('axios');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));
router.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 8*60*60*1000}
}));
// router.use(bodyParser.urlencoded({ extended: true }));

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    global.localStorage = new LocalStorage('./scratch');
}

// const HOST = 'http://localhost:8030/api/v1/';
const HOST = 'http://34.125.101.129:8030/api/v1/';

router.get('/', (req, res) => {
    if (req.session.user && req.session.rol != 2) {
        req.session.rol
        req.session.user;
        req.session.user_data;
        console.log("rol_id:",req.session.rol)
        res.render('intranet/intranet',{ user : req.session.user_data});

    } else {
        res.render('intranet/intranet_login', { loginmsg : 'Tu usuario no cumple con los permisos necesarios.' , flag : 'warning' })
    }

});


module.exports = router;