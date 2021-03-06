import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import Attachment from '../../components/Attachment'
import axios from 'axios'
// import DownloadIcon from '../../assets/download.svg'

export default function Apply({user,setActive}) {
    const[others,setOthers]=useState(false);
    const[certType,setCertType]=useState("Bonafide Certificate");
    const[recipent, setRecipent] = useState("Principal")
    const[body, setBody] = useState("")
    const[sub,setSub]=useState("");
    const[file,setFile]=useState("");
    const[files,setFiles]=useState([]);
    const[pdf,setPdfs]=useState([]);

    const applyCall=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        // formData.append("batchId",user.batchId)
        // formData.append("studentId",user.ktuId)
        // formData.append("category",certType)
        // formData.append("recipent",recipent)
        // formData.append("letter",body)
        formData.append("attachments", files)
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/student/apply',
            data: {
                    batchId:user.batchId,
                    studentId:user.ktuId,
                    category:certType,
                    recipent:recipent,
                    letter:body,
                    //attachments:files
            },
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
        // axios.post(
        //     'http://localhost:8080/student/apply',
        //      formdata, {
        //         headers: { "Content-Type": "multipart/form-data" },
        //     }
        //     // {
        //     //     params : {
        //     //         batchId:user.batchId,
        //     //         studentId:user.ktuId,
        //     //         category:certType,
        //     //         recipent:recipent,
        //     //         letter:body,
        //     //         attachments:files
        //     //     },
        //     //     headers:{
        //     //         'Content-Type':'multipart/form-data'
        //     //     }
        //     // }
        // )
        .then(res=>{
            if(res.status===200)
            {
                console.log(res)
                alert("Request Submitted")
                setActive("progress")
            }
        }).catch(err=>{console.log(err)})
    }

    const handleType = (e) =>{
        setCertType(e.target.value);
        console.log(certType)
        if(e.target.value==="others"){
            setOthers(true);
        }
        else{
            setOthers(false);
        }
    }
    const onChangeFile = (e)=>{
        setFile(e.target.files[0])
        setFiles([...files,e.target.files[0]]);
        // files.push(file);
    }
    return (
        // <div className="w-full flex flex-col items-center mx-3 py-8">
        //     {apply.map((data, index)=>renderData(data,index))}
        // </div>
        <div className="w-full">
            <form onSubmit={applyCall} enctype="multipart/form-data">
            <section className="border-b-2	border-gray-300	 p-5">
                
                <div className="text-sm text-left w-full mb-5"><h4 className="text-left">Fill below fields to submit the application</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Select Certificate <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500 outline-none" onChange={handleType}>
                    <option value="Bonafide Certificate">Bonafide Certificate</option>
                    <option value="MCM Scholarship">MCM Scholarship</option>
                    <option value="Transfer Certificate">Transfer Certificate</option>
                    <option value="E grantz Scholarship">E grantz scholarship</option>
                    <option value="others">Others</option>
                </select>
                <br/>
                {others?
                <div>
                <label className="text-sm pl-10">Please specify</label><span className="text-blue-500	">*</span>
                <input className="ml-10 mt-6 p-1 rounded-md border-blue-500" type="text" size="60"/></div>:""}
            </section>


            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-sm text-left w-full mb-5"><h4 className="text-left">Fill below fields to generate letter</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Recipient <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500" required onChange={e=>{setRecipent(e.target.value)}}>
                    <option value="principal">Principal</option>
                    <option value="dean">Dean</option>
                    {/* <option value="pgdean">P.G Dean</option> */}
                    {/* <option value="hostel">Hostel Office</option> */}
                    {/* <option value="library">Library</option> */}
                </select>
                <br />

                <label  className="text-sm pl-10">Subject <span className="text-blue-500 pl-30">*</span></label>
                <input className="ml-8 mt-5 border-blue-500	" value={sub} onChange={(e)=>setSub(e.target.value)}type="text" size="60" required/><br />
                <label className="text-sm pl-10">Letter Body<span className="text-blue-500 pl-30">*</span></label>
                <textarea className="ml-12 mt-5 p-5 border-blue-500	outline-none " rows = "5" cols = "60" name = "description" onChange={e=>{setBody(e.target.value)}} required>
                </textarea><br />
            </section>


            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-sm text-left w-full mb-5"><h4 className="text-left">Attachments</h4></div>
                <div className="inline 	">
                    <div className="flex justify-between">
                        <div>
                            <label className="text-sm pl-10">Files Added<span className="text-xs text-blue-500 pl-30"> (Optional)</span></label>
                            <div className="mt-3 pl-10 grid grid-cols-3 gap-4">
                                {files.map(file=>{
                                    return(
                                        <Attachment filename={file.name} files={files} file={file} setFiles={setFiles}/>
                                    )
                                })}
                            </div>
                        </div>
                    {/* <Button  variant="contained" color="primary" >Add Attachments</Button> */}
                    <input
                        accept=".pdf"
                        style={{display:'none'}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onChangeFile}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained"  component="span"
                         style={{textTransform:'capitalize',color:'white',backgroundColor:'#4a86f7',margin:'10px'}} >
                            Add Attachments
                        </Button>
                    </label>
                    </div>
                    
                </div>

                {/* <label for="certificate" className="text-sm pl-10">Description <span className="text-xs text-blue-500 pl-30"> (Optional)</span></label>
                <textarea className="ml-8 mt-5 p-5 border-blue-500 outline-none " rows = "3" cols = "50" name = "description">
            
         </textarea>*/}<br />                 
                {/*  */}
            </section>

            <section >
                <div className="  flex 	justify-end	mt-5 mb-5">
                    {/* <Button  style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none',margin:'5px'}}>Save Changes</Button> */}
                    <Button  type="submit" variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7',margin:'10px'}}>Submit</Button>
                </div>
            </section>
            </form>

        </div>
    )
}
