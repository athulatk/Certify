const bcrypt=require('bcrypt')
const {hodUser}=require('./models/hodSchema');
const {authority}=require('./models/authoritySchema')
exports.hodregister=async(req,res)=>{
    try{
        var hashedPassword=await bcrypt.hash(req.body.password,10);
        var hod=new hodUser({
            email:req.body.email,
            password:hashedPassword,
            department:req.body.department
        })
        hod.save()
        .then(()=>{
            hodUser.find({},(err,log)=>{
                if (err) 
                    return res.send(err);
                return res.send(log);
            })
            
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    catch{
        res.status(500).send()
    }

}

exports.displayhods=(req,res)=>{
    hodUser.find({})
    .then(data=>{
        return res.send(data);
    })
}

exports.authorityregister=async(req,res)=>{
    try{
        var hashedPassword=await bcrypt.hash(req.body.password,10);
        var auth=new authority({
            email:req.body.email,
            password:hashedPassword,
            role:req.body.role
        })
        auth.save()
        .then(()=>{
            return res.send("Success");
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    catch{
        res.status(500).send()
    }

}



