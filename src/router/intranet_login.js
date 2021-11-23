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
    res.render('intranet/intranet_login', {loginmsg : null, flag : null})
});

router.post('/', async(req, res) => {
    const users = {
        email: req.body.email,
        password: req.body.password
    };

    console.log(users)

    try {
        const postLogin = await axios.post(HOST + 'login/', users)
        console.log("Respuesta: ", postLogin.data)
        const token = postLogin.data.access_token
        console.log(token)
            
        localStorage.setItem(postLogin.data.user_id, token);
        console.log("TokenLocalStorage:", localStorage.getItem(postLogin.data.user_id));
        req.session.user = postLogin.data.user_id;
        req.session.rol = postLogin.data.rol_id;
        req.session.user_data = req.body.email;
        res.redirect('/home')
    }catch (err) {
        if(err.response) {
            console.log("RESPONSE DETAIL:",err.response.data.detail)
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('/intranet_login', { loginmsg : err.response.data.detail, flag : 'warning' })
            
        } else if(err.requiest) {
            console.log(err.requiest)
            res.render('/intranet_login', { loginmsg : null, flag : 'warning' })
        } else {
            console.error('Error', err.message)
            res.render('/intranet_login', { loginmsg : null, flag : 'warning' })
        }
    } 
});

module.exports = router;