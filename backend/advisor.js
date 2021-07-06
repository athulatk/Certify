const {studentUser}=require('./models/studentuserSchema')
const {advisorUser}=require('./models/advisorSchema')
var {application}=require('./models/applicationSchema')

exports.advisorLogin=(req, res) => {
    req.user.password=null
    res.send(req.user)
}

exports.applications=async (req, res)=>{
    const dataApplication=await application.find({batchId:req.query.batchId})
    
    console.log("mydatataaaaa : ",dataApplication)
    const data=[]

    dataApplication.forEach(application=>{
        const dataStud=studentUser.find({studentId:application.studentId})
        data.append({
            application:application,
            student:dataStud
        })
    })

    data.sort((a,b)=>b.application.date - a.application.date)
    res.send(data)
}

exports.approveAppication=(req, res) => {
    application.updateOne({_id:req.query._id},{returned:false, approved:true}, (err, log)=>{
        if(!err)
            res.send("success")
        else
            res.status(400).send()
    })
}

exports.passwordChange=async (req, res)=>{
    
    var hashedPassword=await bcrypt.hash(req.body.password,10)

    advisorUser.updateOne({email:req.body.email}, { $set: { password: hashedPassword } }, (err, log)=>{
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

exports.returnAppication=(req, res) => {
    application.updateOne({_id:req.query._id},{returned:true, approved:false}, (err, log)=>{
        if(!err)
            res.send("success")
        else
            res.status(400).send()
    })
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