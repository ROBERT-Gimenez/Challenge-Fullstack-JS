const express =require('express');
const app = express();
const path = require('path');
const methodOverride =require('method-override')
const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT  ||  4000;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('../src/middlewares/cookieSession');


/* Routes */
const indexRouter = require("../src/Routes/indexRouter")
const userRouter = require('../src/Routes/userRouter');
const apiAdmin = require('./Routes/apiRoutes');



/* Views config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));

/* Middlewares */
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));


app.use(methodOverride('_method'));
app.use(bodyParser.json()) 
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession);


/* session */
app.use(session({
    secret:"AlkemyCookie",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(express.json());


app.use ('/', indexRouter);
app.use('/user', userRouter);


/// APIS Routes ///

 app.use('/api' , apiAdmin);
 app.use((req, res, next) => {
    res.status(404).render('not-found')
})

app.listen(PORT, () => console.log( `Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}`))

module.exports=app;