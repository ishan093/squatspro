const express = require('express');
const app = express(); //create express application
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const DBconfig = require('./config/db');
const cors = require('cors'); // for allowing cross -origin - resource sharing 
const mongoose = require('mongoose');
const login = require('./routes/user/login');
const register = require('./routes/user/register');
const post = require('./routes/posts');
const logout=require('./routes/logout');
const users=require('./routes/users');
const passportConfig = require('./config/passport')(passport);


//conneting to mongoDB data base
mongoose.connect(DBconfig.url, (err,res) => {
    useMongoClient: true
    if(err){
        console.log('error connecting to mongo database');
    }
    else{
        console.log('connected to'+ DBconfig.url);
        
    }
});


/*
 creating application evironment  
*/  
 
app.use(logger('dev'));     // log requests to console
app.use(bodyParser.json());     //allow application to use bodyParse
app.use(bodyParser.urlencoded({ extended: false })); //allow application to extract data from requests


/*
    allow server for cross browser requests
*/

// setting cors options/settings
const originsWhitelist = [
    'http://localhost:3000'
  ];
  const corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

// seeting up application to use cors
app.use(cors(corsOptions));


// initializing express session
app.use(session({secret: 'mySecretKey',saveUninitialized: true,resave: true}));

//intializing passport
app.use(passport.initialize());

//use passport sessions
app.use(passport.session());

//cofiguring passport local stratergy ..name 'login'


/*
 configuring routes
*/
passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    done(null, username);
});

app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/post',post);
app.use('/api/logout',logout);
app.use('/api/users',users);


/*
 creating server that listens on port 3001
*/
app.listen(3001,function(){
    console.log('server running at port 3001');
})


module.exports = app;