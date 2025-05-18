require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const isActiveRoute = require('./helpers/routeHelpers.js');


const app = express();
const PORT = 5000 || process.env.PORT;


connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(methodOverride('_method')); 

app.locals.isActiveRoute = isActiveRoute;

app.use(session({
    secret: "nawras",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    cookie: { maxAge: new Date(Date.now() + (3600000)) },
}));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/main.js'));
app.use('/', require('./routes/admin.js'));

app.listen(PORT, () => {
    console.log(`App listening on the port ${PORT}`);
})