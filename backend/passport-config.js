const LocalStrategy=require('passport-local').Strategy
const {studentUser}=require('./server')
const bcrypt=require('bcrypt')

const initializePassport=(passport)=>{

    const authenticateUser=(User)=>(email, password, done)=>{
        User.findOne({email:email},async (err,user)=>{
            if(err)
                return done(err)
            if(!user)
            {
                console.log("User not found")
                return done(null, false, {message: 'No student user with this email'})
            }
            try{
                if(await bcrypt.compare(password,user.password)){
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

    passport.use('studentLocal',new LocalStrategy({usernameField:'email'}, authenticateUser(studentUser)));

    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    
    passport.deserializeUser(function(email, done) {
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
        studentUser.findOne({email:email}, (err,user)=>{
            done(err,user);
        })
    });
}
exports.initializePassport=initializePassport