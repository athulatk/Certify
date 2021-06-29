import React,{useState} from 'react'
import {Button,TextField} from '@material-ui/core'
import axios from 'axios'
// import DownloadIcon from '../../assets/download.svg'

export default function Apply({apply}) {
    const[others,setOthers]=useState(false);
    const[certType,setCertType]=useState("Bonafide Certificate");
    const [recipent, setRecipent] = useState("Principal")
    const [body, setBody] = useState(null)
    const[sub,setSub]=useState("");


    const applyCall=()=>{
        axios.get(
            'http://localhost:8080/student/apply',
            {
                params : {
                    category:certType,
                    recipent:recipent,
                    letter:body
                }
            }
        ).then(res=>{
            if(res.status===200)
            {
                console.log(res)
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

    return (
        // <div className="w-full flex flex-col items-center mx-3 py-8">
        //     {apply.map((data, index)=>renderData(data,index))}
        // </div>
        <div className=" w-full ">
            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-xs text-left w-full mb-5"><h4 className="text-left">Fill below fields to submit the application</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Select Certificate <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500 outline-none" onChange={handleType}>
                    <option value="bonafide">Bonafide Certificate</option>
                    <option value="library">MCM Scholarship</option>
                    <option value="tc">Transfer Certificate</option>
                    <option value="hostel">E grantz scholarship</option>
                    <option value="others">Others</option>
                </select>
                <br/>
                {others?
                <div>
                <label className="text-sm pl-10">Please specify</label><span className="text-blue-500	">*</span>
                <input className="ml-10 mt-6 p-1 rounded-md border-blue-500" type="text" size="60"/></div>:""}
            </section>


            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-xs text-left w-full mb-5"><h4 className="text-left">Fill below fields to generate letter</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Recipient <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500" required onChange={e=>{setRecipent(e.target.value)}}>
                    <option value="principal">Principal</option>
                    <option value="ugdean">U.G Dean</option>
                    <option value="pgdean">P.G Dean</option>
                    <option value="hostel">Hostel Office</option>
                    <option value="library">Library</option>
                </select>
                <br />

                <label for="certificate" className="text-sm pl-10">Subject <span className="text-blue-500 pl-30">*</span></label>
                <input className="ml-8 mt-5 border-blue-500	" value={sub} onChange={(e)=>setSub(e.target.value)}type="text" size="60" required/><br />
                <label for="certificate" className="text-sm pl-10">Body <span className="text-blue-500 pl-30">*</span></label>
                <textarea className="ml-12 mt-5 p-5 border-blue-500	outline-none " rows = "5" cols = "60" name = "description" onChange={e=>{setBody(e.target.value)}} required>
                </textarea><br />

                {/*  */}
            </section>


            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-xs text-left w-full mb-5"><h4 className="text-left">Attachments</h4></div>
                <div className="inline 	">
                    <div className="flex justify-between">
                    <label for="certificate" className="text-sm pl-10">Files Added <span className="text-xs text-blue-500 pl-30"> (Optional)</span></label>
                    
                    <Button  variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7',margin:'10px'}}>Add Attachments</Button>

                    </div>
                    
                </div>

                <label for="certificate" className="text-sm pl-10">Description <span className="text-xs text-blue-500 pl-30"> (Optional)</span></label>
                <textarea className="ml-8 mt-5 p-5 border-blue-500 outline-none " rows = "3" cols = "50" name = "description">
            
         </textarea><br />




                
                {/*  */}
            </section>

            <section >
                <div className="  flex 	justify-end	mt-5 mb-5">
                    <Button  style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none',margin:'5px'}}>Save Changes</Button>
                    <Button  variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7',margin:'10px'}} onClick={()=>{applyCall()}}>Submit</Button>
                </div>
            </section>


        </div>
    )
}
