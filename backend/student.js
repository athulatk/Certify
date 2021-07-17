const {studentUser}=require('./models/studentuserSchema')
const {advisorUser}= require('./models/advisorSchema')
const {batch}=require('./models/batchSchema')
const {application}=require('./models/applicationSchema')

const bcrypt=require('bcrypt')


exports.applications=(req,res)=>{
    application.find({studentId:req.query.studentId}, (err,docs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(docs);
        }
    });
}


exports.apply=(req,res)=>{
    var today = new Date().toISOString().slice(0, 10)
    // console.log("reques : ",req)
    var data={
        ...req.query,
        date:today,
        status:"Staff Advisor",
        returned:false,
        approved:false,
        feedback:null,
    }

    application.create(data,function (err, small) {
        if (err) {
            console.log(err)
            res.send(err)};
        console.log(small)
        res.status(200).send()
        // saved!
    });
}

exports.editApplication=(req, res)=>{
    var today = new Date().toISOString().slice(0, 10)
    // console.log("reques : ",req)
    var data={
        ...req.query,
        date:today,
        status:"Staff Advisor",
        returned:false,
        approved:false,
        feedback:null,
    }

    application.updateOne({_id:data._id},{...data},(err,log)=>{
        console.log("Number of Records Effected"+log);
        res.status(200).send("success")
    })
}

exports.passwordChange=async (req, res)=>{
    
    var hashedPassword=await bcrypt.hash(req.body.password,10)

    studentUser.updateOne({email:req.body.email}, { $set: { password: hashedPassword } }, (err, log)=>{
        if(!err)
        {
            console.log(log)
            res.send("successsss")
        }
        else{
            res.status(400).send()
        }
    })
}
exports.studentLogin=(req, res) => {
    req.user.password=null
    
    // console.log("final user: ", req.user);
    res.send(req.user)
}

exports.studentRegister= async (req,res)=>{
    for(var i=0;i<req.body.length;i++){
        try{
            var hashedPassword=await bcrypt.hash(req.body[i].Password,10)
            req.body[i].Password=hashedPassword;

            var user=new studentUser({
                ...req.body[i],
                loginCount:0
            })
            user.save()
        }
        catch{
            return res.status(500).send()
        }   
    }
    return res.send("Success..");
        
}



