const express =require('express');
const app = express();
const path = require('path');
const methodOverride =require('method-override')
const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT  ||  4000;
const session = require('express-session');
const bodyParser = require('body-parser');


/* Routes */
const indexRouter = require("../src/Routes/indexRouter")
const apiAdmin = require('./Routes/apiRoutes')



/* Views config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));

/* Middlewares */
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));


app.use(methodOverride('_method'));
app.use(bodyParser.json()) 
app.use(express.json());


/* session */
app.use(session({
    secret:"weekly budget",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(express.json());


app.use ('/', indexRouter);

/// APIS Routes ///

 app.use('/api' , apiAdmin);
 app.use((req, res, next) => {
    res.status(404).render('not-found')
})

app.listen(PORT, () => console.log( `Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}`))

module.exports=app;