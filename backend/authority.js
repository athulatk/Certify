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
    console.log("hod application called")
    await application.find({ $and : [ { status:{ $ne : "Staff Advisor"} }, { status:{ $ne : "hod"} } ] },(err,log)=>{
        //console.log(log)
        if(!err)
        dataApplication=[...log];
    })
    
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

}