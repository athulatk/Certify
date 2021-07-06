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

const advisor= require('./advisor');
const hod= require('./hod')
const student = require('./student');

//student routes
app.get('/student/apply',(req, res)=>student.apply(req, res));
app.post('/student/editApplication', (req, res)=>student.editApplication(req, res))
app.post('/student/login', passport.authenticate('studentLocal'), (req, res)=>student.studentLogin(req, res))
app.post('/student/passwordChange', (req, res)=>student.passwordChange(req, res))
app.get('/checkAuthenticated', checkAuthenticated, (req, res)=>{
    // console.log("heeree")
    req.user.password=null
    res.send(req.user)
})

//staff advisor routes
app.post('/advisor/login', passport.authenticate('advisorLocal'), (req, res)=>advisor.advisorLogin(req, res))
app.post('/advisor/student/register', (req, res)=>advisor.studentRegister(req, res))
app.post('/advisor/passwordChange', (req, res)=>advisor.passwordChange(req, res))
app.get('/advisor/return', (req, res)=>advisor.returnApplication(req, res))
app.get('/advisor/application', (req, res)=>advisor.applications(req, res))
app.get('/advisor/approve', (req, res)=>advisor.approveApplication(req, res))

//hod routes
app.post('/hod/advisor/register', (req, res)=>hod.advisorRegister(req, res))
app.get('/hod/staffadvisors',(req,res)=>hod.getAdvisors(req,res))

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