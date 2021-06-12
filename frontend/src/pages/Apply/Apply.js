import React from 'react'
import {Button,TextField} from '@material-ui/core'
// import DownloadIcon from '../../assets/download.svg'

export default function Apply({apply}) {

    // const renderData=(data, index)=>{
    //     return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 ring-blue-500 shadow-xl items-center justify-between w-full my-2">

    //         <section className="w-2/12 flex justify-center">
    //         <div className="h-7 w-7 rounded-full flex items-center font-bold justify-center text-sm text-blue-500 bg-indigo-100">
    //                <div>{index+1}</div>
    //            </div>
    //         </section>
                
    //         <section className="w-2/12 flex justify-center">
    //             <div className="text-sm flex items-center justify-center ">
    //                 <div>{data.name}</div>
    //             </div>
    //         </section>
    //         <section className="w-2/12 flex justify-center text-md">
    //             <div className="flex flex-col items-center">
    //             <div className="text-xs">Certified Date:</div>
    //                 <div className="text-sm flex items-center justify-center ">
    //                     <div>{data.certifiedDate}</div>
    //                 </div>

                    
    //             </div>
    //         </section>



    //         <section className="w-2/12 rounded-l-full flex justify-center text-md" >
    //             <div className="flex flex-col items-center">
    //             <div className="text-xs">Issued By:</div>

    //                 <div className="text-sm flex items-center justify-center ">
    //                     <div>
    //                         {data.status}
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
            
    //         <section className="w-2/12 flex justify-center">
    //             <div className="text-sm flex items-center justify-center ">
    //                 <div>{data.approvedRemark}</div>
    //             </div>
    //         </section>


    //         <section className="w-2/12 flex justify-center">
    //             <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
    //                 <div>{data.scannedFile}</div>
    //             </div>
    //         </section>

    //         <section className="w-2/12 flex justify-center">
    //             <div className="h-7 w-7 cursor-pointer">
    //                 <img src={DownloadIcon} alt=""/>
    //             </div>
    //         </section>
            
            

            
    //     </div>)
    // }

    return (
        // <div className="w-full flex flex-col items-center mx-3 py-8">
        //     {apply.map((data, index)=>renderData(data,index))}
        // </div>
        <div className=" w-full ">
            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-xs text-left w-full mb-5"><h4 className="text-left">Fill below fields to submit the application</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Select Certificate <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500" >
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                </select>
                
                {/*  */}
            </section>


            <section className="border-b-2	border-gray-300	 p-5">
                <div className="text-xs text-left w-full mb-5"><h4 className="text-left">Fill below fields to generate letter</h4></div>
                
               
                <label for="certificate" className="text-sm pl-10">Recipient <span className="text-blue-500	">*</span></label>
                <select name="certificate" className="ml-5 p-1 rounded-md border-blue-500" >
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                    <option value="volvo">Bonafide Certificate</option>
                </select>
                <br />


                <label for="certificate" className="text-sm pl-10">Subject <span className="text-blue-500 pl-30">*</span></label>
                <input className="ml-8 mt-5 border-blue-500	" type="text" size="60"  /><br />
                <label for="certificate" className="text-sm pl-10">Body <span className="text-blue-500 pl-30">*</span></label>
                <textarea className="ml-12 mt-5 p-5 border-blue-500	" rows = "5" cols = "60" name = "description">
           
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
                <textarea className="ml-8 mt-5 p-5 border-blue-500	" rows = "3" cols = "50" name = "description">
            
         </textarea><br />




                
                {/*  */}
            </section>

            <section >
                <div className="  flex 	justify-end	mt-5 mb-5">
                    <Button  style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none',margin:'5px'}}>Save Changes</Button>
                    <Button  variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7',margin:'10px'}}>Submit</Button>
                </div>
            </section>


        </div>
    )
}
