const bcrypt=require('bcrypt')

const {advisorUser}= require('./models/advisorSchema')
const {batch}=require('./models/batchSchema')
const {studentUser}=require('./models/studentuserSchema')
const {application}=require('./models/applicationSchema')
const {hodUser}=require('./models/hodSchema')

exports.hodLogin=(req, res) => {
    req.user.password=null
    res.send(req.user)
}

exports.applications=async(req, res)=>{
    var dataApplication=[];
    var semester;
    console.log("hod application called")
    await application.find({department:req.query.department, status:{ $ne : "Staff Advisor"}},async (err,log)=>{
        //console.log(log)
        if(!err)
        {
            dataApplication=[...log];
            console.log("mydatataaaaa : ",dataApplication)
            const data=[]
        
            for(var index in dataApplication){
                
                await batch.findOne({_id:dataApplication[index].batchId},(err,log)=>{
                    semester=log.semester
                })
        
                await studentUser.findOne({ktuId:dataApplication[index].studentId},(err,log)=>{
                    console.log(log)
                    log["_doc"].department=req.query.department
                    log["_doc"].semester=semester
                    data.push({
                        application:dataApplication[index],
                        student:log
                    })
                })
            }
            data.sort((a,b)=>b.application.date - a.application.date)
            console.log(data)
            res.send(data)
        }
        
        
    })
    
    // dataApplication.forEach(async application=>{
    //     //console.log(application,'\n');
        
    // })

}

exports.approveApplication=(req, res) => {
    application.updateOne({_id:req.query._id}, { $set :  { status : req.query.forwardTo } }, (err, log)=>{
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

    hodUser.updateOne({email:req.body.email}, { $set: { password: hashedPassword } }, (err, log)=>{
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

exports.advisorRegister= async (req,res)=>{
    try{
        var hashedPassword=await bcrypt.hash(req.body.password,10)

        var data={
            ...req.body,
            noApplications:0,
            password:hashedPassword
        };

        //check for a batch in batches
        await batch.find({semester:req.body.semester, department:req.body.department},(err,log)=>{
            if(err) 
                console.log("myerrorrr : ",err);
            else
            {
                console.log("length :",log.length)

                //batch length = 0 means new batch to be created
                if(log.length==0)
                {
                    var newBatch={
                        department:req.body.department,
                        semester:req.body.semester
                    }

                    myBatch=new batch(newBatch)

                    myBatch.save((err, log)=>{
                        if(err) 
                            console.log(err)
                        else
                        {
                            console.log("looog : ",log._id)
                            data={...data, batchId: log._id}
                            console.log(data)

                            //advisor created with batch id as objectid of this batch
                            myAdvisor=new advisorUser(data)
                
                            myAdvisor.save((err, log)=>{
                                if(err) 
                                    console.log(err)
                                else
                                {
                                    console.log("looog 2 : ",log)
                                }
                            })
                        }
                    })
                }
                else //Add the new advisor with batch id as existing batch's object id
                {
                    console.log("looog myyyy: ",log)
                    data={...data, batchId: log[0]._id}
                    console.log(data)

                    myAdvisor=new advisorUser(data)
        
                    myAdvisor.save((err, log)=>{
                        if(err) 
                            console.log(err)
                        else
                        {
                            console.log("looog 2 : ",log)
                        }
                    })
                }
            }
        });

        res.send("success")
        // console.log("req.body : ",req.body)
        
        // studentUser.create(data, function (err, small) {
        //     if (err) return handleError(err);
        //     console.log(small)
        //     res.status(200).send("success")
        //     // saved!
        // });
    }
    catch{
        return res.status(500).send()
    } 
        
}

exports.getAdvisors=(req,res)=>{
    var batches=[];
    batch.find({department:req.query.department},function(err,docs){
        if(docs.length!=0){
            docs.forEach((item)=>{
                batches.push(item._id)
            })
        }
    advisorUser.find({batchId:batches})
    .populate('batchId','semester')
    .then((docs)=>{
        return res.send(docs)
    })
    })
}
