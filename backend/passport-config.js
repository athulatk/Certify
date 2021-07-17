const LocalStrategy=require('passport-local').Strategy
const {studentUser}=require('./models/studentuserSchema')
const {advisorUser}=require('./models/advisorSchema')
const {batch}=require('./models/batchSchema')
const {hodUser}=require('./models/hodSchema')
const {authority}=require('./models/authoritySchema')

const passport=require('passport')
const bcrypt=require('bcrypt')

const initializePassport=()=>{

    const authenticateUser=(User, isStudent)=>(email, password, done)=>{

        User.findOne({email:email},async (err,user)=>{
            if(err)
                return done(err)
            if(!user)
            {
                console.log("User not found")
                return done(null, false, {message: 'No student user with this email'})
            }
            try{

                console.log(email, " ", password )
                if(await bcrypt.compare(password,user.password)){
                    if(user.loginCount!=undefined)
                    {
                        console.log("count : ",user.loginCount)
                        User.findOneAndUpdate({email:email}, {$inc:{loginCount:1}}).exec()
                    }


                    if(isStudent)
                    {
                        var department=null
                        var semester=null
                        var advisors=[]

                        await batch.findOne({_id:user.batchId}, (err, log) => {
                            console.log("batch : ",log)

                            user._doc["department"]=log.department
                            user._doc["semester"]=log.semester
                            
                            advisorUser.find({batchId:user.batchId}, (err, log) => {
                                console.log("im here", log)
                                user._doc["advisors"]=[...log.map(advisor=>advisor.name)]

                                return done(null, user)
                            })
                        })

                        // console.log("user is :", user._doc)
                    }
                    else
                        return done(null, user)
                }
                else
                    return done(null, false, {message: 'Password Incorrect'})
                // if(password===user.password){
                //     return done(null, user)
                // }
            }catch(e){
                return done(e)
            }
        })
    }

    
    passport.serializeUser(function(user, done) {
        // console.log({...user})
        done(null, user.email);
    });
    
    passport.deserializeUser(function(email, done) {
        // User.findById(id, function(err, user) {
            //     done(err, user);
            // });
        console.log("i hv been called")
        studentUser.findOne({email:email}, (err,user)=>{
            done(err,user);
        })
    });

    passport.use('studentLocal',new LocalStrategy({usernameField:'email'}, authenticateUser(studentUser, true)));
    passport.use('advisorLocal',new LocalStrategy({usernameField:'email'}, authenticateUser(advisorUser, false)));
    passport.use('hodLocal',new LocalStrategy({usernameField:'email'}, authenticateUser(hodUser, false)));
    passport.use('authorityLocal',new LocalStrategy({usernameField:'email'}, authenticateUser(authority, false)));

    return passport
}


exports.initializePassport=initializePassport