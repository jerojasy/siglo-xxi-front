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


router.get('/', async(req, res) => {
    try {
        const getMenu = await axios.get(HOST+'food_plates/get_all_food_plates_wjwt/')
        res.render('index', { listamenu : getMenu.data})
        console.log(getMenu.data)
    }catch (err){
        if (err.response) {
            res.render('index', { listamenu : null})
            res.send(err.response)
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request){
            res.render('index', { listamenu : null})
            console.log(err.request)
        }else{
            res.render('index', {listamenu : null})
            console.error('Error', err.message)
        }
    }
});


module.exports = router;