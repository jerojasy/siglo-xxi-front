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

router.get('/',(req, res) => {
    if (req.session.user) {
        console.log("Session Data:",req.session.user);
        req.session.user;
        req.session.user_data;
        console.log("session data 2:", req.session.user_data)
        res.render('reserva', { resmsg : null , flag : null })
    } else {
        res.render('login', { loginmsg : 'Debes iniciar sesión' , flag : 'warning' })
    }
    
});

router.post('/', async(req, res) => {
    const form = {
        date_applied: req.body.fechareserva,
        user_id: req.session.user
    }
    console.log(form)
    try{
        const postReserva = await axios.post(HOST+'reservation/reservation_create/', form, {headers: {
            'accept': 'application/json',
            'token': localStorage.getItem(req.session.user)
        }})
        console.log("RESPONSE:", postReserva.data)
        res.render('reserva', {resmsg : 'Reserva realizada con exito', flag : 'success'})
    }catch(err){
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('reserva', {resmsg : err.response.data, flag : 'warning'})
        } else if(err.request){
            console.log(request)
        }else{
            console.error('Error', err.message)
        }
    }
});

module.exports = router;