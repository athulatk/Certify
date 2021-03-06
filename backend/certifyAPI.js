const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const {initializePassport}=require('./passport-config')

const passport=initializePassport()

var app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(cookieParser());

app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

app.use(bodyParser.json())

app.use(session({
    // secret: process.env.SESSION_SECRET,
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//Configuring express server
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const advisor= require('./advisor');
const hod= require('./hod')
const student = require('./student');
const admin=require('./admin');
const authority=require('./authority');

//student routes
app.post('/student/apply',(req, res)=>student.apply(req, res));
app.get('/student/applications',(req, res)=>student.applications(req, res));
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
app.get('/advisor/applications', (req, res)=>advisor.applications(req, res))
app.get('/advisor/approve', (req, res)=>advisor.approveApplication(req, res))

//hod routes
app.get('/hod/applications', (req, res)=>hod.applications(req, res))
app.post('/hod/login', passport.authenticate('hodLocal'), (req, res)=>hod.hodLogin(req, res))
app.post('/hod/passwordChange', (req, res)=>advisor.passwordChange(req, res))
app.post('/hod/advisor/register', (req, res)=>hod.advisorRegister(req, res))
app.get('/hod/staffadvisors',(req,res)=>hod.getAdvisors(req,res))
app.get('/hod/approve',(req,res)=>hod.approveApplication(req,res))
app.get('/hod/return', (req, res)=>hod.returnApplication(req, res))

//authority
app.post('/authority/login', passport.authenticate('authorityLocal'), (req, res)=>authority.authorityLogin(req, res))
app.post('/authority/passwordChange', (req, res)=>advisor.passwordChange(req, res))
app.get('/authority/applications',(req,res)=>authority.applications(req,res))
app.get('/authority/approve',(req,res)=>authority.approveApplication(req,res))
app.get('/authority/return',(req,res)=>authority.approveApplication(req,res))

//admin routes
app.post('/admin/hod/register',(req,res)=>admin.hodregister(req,res))
app.get('/admin/hods',(req,res)=>admin.displayhods(req,res))
app.post('/admin/authority/register',(req,res)=>admin.authorityregister(req,res))

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
