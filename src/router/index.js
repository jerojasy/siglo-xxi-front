const express = require('express');
const router = express.Router();
const axios = require('axios');
const session = require('express-session');
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
    res.render("index")
});


module.exports = router;