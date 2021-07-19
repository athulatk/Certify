const {studentUser}=require('./models/studentuserSchema')
const {advisorUser}=require('./models/advisorSchema')
var {application}=require('./models/applicationSchema')
const {batch} =require('./models/batchSchema')
const bcrypt=require('bcrypt')

exports.advisorLogin=(req, res) => {
    req.user.password=null
    res.send(req.user)
}

exports.applications=async(req, res)=>{
    var dataApplication=[];
    var department;
    var semester;
    
    
    
    await batch.findOne({_id:req.query.batchId},(err,log)=>{
        department=log.department
        semester=log.semester
    })

    await application.find({batchId:req.query.batchId}).then((dataApplication)=>{

            // console.log(log)
            // dataApplication=[...log];
    
            console.log("mydatataaaaa : ",dataApplication)
            const data=[]

            var count=0;

            dataApplication.forEach(async (thisApplication)=>{
                
                await studentUser.findOne({ktuId:thisApplication.studentId},(err,log)=>{
                    console.log(log)
                    log["_doc"].department=department
                    log["_doc"].semester=semester
                    data.push({
                        application:thisApplication,
                        student:log
                    })
                    count++;

                    if(count==dataApplication.length)
                    {
                        data.sort((a,b)=>b.application.date - a.application.date)
                        res.send(data)
                    }
                })

            })
        
            // for(var index in dataApplication){
        
            //     await studentUser.findOne({ktuId:dataApplication[index].studentId},(err,log)=>{
            //         console.log(log)
            //         log["_doc"].department=department
            //         log["_doc"].semester=semester
            //         data.push({
            //             application:dataApplication[index],
            //             student:log
            //         })
            //         count++;

            //         if(count==dataApplication.length)
            //         {
            //             data.sort((a,b)=>b.application.date - a.application.date)
            //             res.send(data)
            //         }
            //     })
            // }

            // dataApplication.forEach(async application=>{
            //     //console.log(application,'\n');
                
            // })
            //data.sort((a,b)=>b.application.date - a.application.date)
      
    })
    
    // res.json({status : "not found"}).send()
}

exports.approveApplication=(req, res) => {
    application.updateOne({_id:req.query._id}, { $set :  { status : "hod" } }, (err, log)=>{
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

exports.returnApplication=(req, res) => {
    application.updateOne({_id:req.query._id},{ $set : {returned:true, approved:false,feedback:req.query.feedback}}, (err, log)=>{
        if(!err)
            res.send("success")
        else
            res.status(400).send()
    })
}

exports.studentRegister= async (req,res)=>{

    const advisorUser=req.body.advisorUser
    const studentData=req.body.studentData

    for(var i=0;i<studentData.length;i++){
        try{
            var hashedPassword=await bcrypt.hash(studentData[i].password,10)
            studentData[i].password=hashedPassword;

            var user=new studentUser({
                ...studentData[i],
                loginCount:0,
                batchId:advisorUser.batchId
            })
            user.save()
        }
        catch{
            return res.status(500).send()
        }
        
    }
    return res.send("Success..");
        
}