const bcrypt=require('bcrypt')

const {advisorUser}= require('./models/advisorSchema')
const {batch}=require('./models/batchSchema')
const {studentUser}=require('./models/studentuserSchema')
const {application}=require('./models/applicationSchema')
const {authority}=require('./models/authoritySchema')

exports.authorityLogin=(req, res) => {
    req.user.password=null
    res.send(req.user)
}

exports.applications=async(req, res)=>{
    var dataApplication=[];
    var semester;
    var department;
    console.log("authority application called")
    await application.find({ $and : [ { status:{ $ne : "Staff Advisor"} }, { status:{ $ne : "hod"} } ] },async(err,log)=>{
        //console.log(log)
        if(!err)
        dataApplication=[...log];

        console.log("mydatataaaaa : ",dataApplication)
        const data=[]
    
        for(var index in dataApplication){
            
            await batch.findOne({_id:dataApplication[index].batchId},(err,log)=>{
                semester=log.semester
                department=log.department
            })
    
            await studentUser.findOne({ktuId:dataApplication[index].studentId},(err,log)=>{
                console.log(log)
                log["_doc"].department=department
                log["_doc"].semester=semester
                data.push({
                    application:dataApplication[index],
                    student:log
                })
            })
        }
        // dataApplication.forEach(async application=>{
        //     //console.log(application,'\n');
            
        // })
        data.sort((a,b)=>b.application.date - a.application.date)
        console.log(data)
        res.send(data)
    })
    

}

exports.approveApplication=(req, res) => {
    application.updateOne({_id:req.query._id}, { $set :  { approved : true,status:"Approved" } }, (err, log)=>{
        if(!err)
        {
            console.log("status changed : ")
            res.send("success")
        }
        else
            res.status(400).send()
    })
}

exports.passwordChange=async (req, res)=>{
    
    var hashedPassword=await bcrypt.hash(req.body.password,10)

    authority.updateOne({email:req.body.email}, { $set: { password: hashedPassword } }, (err, log)=>{
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