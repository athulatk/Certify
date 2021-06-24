const express = require('express');
const cors = require('cors');
const passport=require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const {initializePassport}=require('./passport-config')
initializePassport(passport)

var app = express();

app.use(cookieParser());
app.use(session({
    // secret: process.env.SESSION_SECRET,
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//Configuring express server
app.use(cors());
app.use(express.json());

const application=require('./application');
const student = require('./student');

//student routes
app.get('/apply',(req,res)=>application.apply(req,res));
app.post('/student/login', passport.authenticate('studentLocal'), (req,res)=>student.studentLogin(req,res))
app.post('/student/register', (req,res)=>student.studentRegister(req,res))

app.get('/checkAuthenticated', checkAuthenticated, (req,res)=>{
    // console.log("heeree")
    req.user.password=null
    res.send(req.user)
})

function checkAuthenticated(req, res, next){
    console.log("im heeree")
    if(req.isAuthenticated())
    {
        console.log("authenticated")
        return next();
    }
    res.sendStatus(401)
}
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));