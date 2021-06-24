var {application}=require('./server')
days=['sunday','monday','tuesday','wednsday','thursday','friday','saturday']

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

    // var myApplication=new application(data);
    
    console.log("here : ",myApplication)
    
    // myApplication.save(function (err) {
    //     if (err) console.log(err);
    //     // saved!
    // });
    application.create(data, function (err, small) {
        if (err) return handleError(err);
        console.log(small)
        // saved!
    });
    // myApplication.save().then(saveDoc=>{
    //         console.log("doc: ",saveDoc)
    //         res.status(200)
    //     }
    // ).catch(err=>{
    //         console.log(err)
    //         res.status(500)
    //     }
    // )
}


