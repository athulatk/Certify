const bcrypt=require('bcrypt')

const {advisorUser}= require('./models/advisorSchema')
const {batch}=require('./models/batchSchema')

exports.advisorRegister= async (req,res)=>{
    try{
        var hashedPassword=await bcrypt.hash(req.body.password,10)

        var data={
            ...req.body,
            noApplications:0,
            password:hashedPassword
        };

        await batch.find({semester:req.body.semester, department:req.body.department},(err,log)=>{
            if(err) 
                console.log("myerrorrr : ",err);
            else
            {
                console.log("length :",log.length)

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
                else
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
    batch.find({department:"CSE"},function(err,docs){
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
