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


