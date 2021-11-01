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
    res.render('registro', { regmsg : null })
})

router.post('/', async(req, res) => {
    const form = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        rol_id: 2
    }
    console.log(form)
    try{
        const postRegistro = await axios.post(HOST+'user_create/', 
        {email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            rol_id: 2})
        console.log(postRegistro.data)
        if (postRegistro.data.status == true){
            res.render('login', { loginmsg : 'Registrado correctamente, debes iniciar sesión', flag : 'success' })
        } else if (postRegistro.data.status == false) {
            res.render('registro', { regmsg : 'El usuario ya existe', flag : 'warning' })
        }
    }catch(err){
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('registro', { regmsg : err.response.data, flag : 'warning' })
        } else if(err.request){
            console.log(request)
            res.render('registro', { regmsg : err.response.data, flag : 'warning' })
        }else{
            console.error('Error', err.message)
            res.render('registro', { regmsg : err.response.data, flag : 'warning' })
        }
    }
});

module.exports = router;