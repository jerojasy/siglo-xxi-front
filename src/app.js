const express = require("express");
const app = express();

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname+'/public'));

app.use('/', require('./router/inicio.js'));
app.use('/login', require('./router/login.js'));
app.use('/intranet_login', require('./router/intranet_login.js'));
app.use('/reserva', require('./router/reserva.js'));
app.use('/registro', require('./router/registro.js'));
app.use('/intranet', require('./router/intranet.js'));
app.use('/home', require('./router/home.js'));


app.use((req, res, next) => {
  res.status(404).render("404")
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });