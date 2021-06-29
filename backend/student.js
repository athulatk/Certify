const {studentUser}=require('./models/studentuserSchema')
const bcrypt=require('bcrypt')

var {application}=require('./models/applicationSchema')

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

    application.create(data, function (err, small) {
        if (err) return handleError(err);
        console.log(small)
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

exports.studentLogin=(req, res) => {
    req.user.password=null
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



