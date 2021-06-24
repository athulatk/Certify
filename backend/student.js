var {studentUser}=require('./server')
const bcrypt=require('bcrypt')

exports.studentRegister=async (req,res)=>{
    var hashedPass=await bcrypt.hash(req.body.password, 10)
    console.log("pass : ",hashedPass)
    // console.log("reques : ",req)
    // var data={
    //     ...req.query,
    //     date:today,
    //     status:"Staff Advisor",
    //     returned:false,
    //     approved:false,
    //     feedback:null,
    // }
    var data={
        ...req.body,
        password:hashedPass
    };

    // var student=new studentUser(data);
    
    console.log("req.body : ",req.body)
    
    studentUser.create(data, function (err, small) {
        if (err) return handleError(err);
        console.log(small)
        res.status(200).send("success")
        // saved!
    });
}

exports.studentLogin=(req, res) => {
    req.user.password=null
    res.send(req.user)
}


