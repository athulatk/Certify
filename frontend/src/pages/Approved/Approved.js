import React from 'react'
import DownloadIcon from '../../assets/download.svg'

export default function Approved({approved}) {

    const renderData=(data, index)=>{
        return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 ring-blue-500 shadow-xl items-center justify-between w-full my-2">

            <section className="w-2/12 flex justify-center">
            <div className="h-7 w-7 rounded-full flex items-center font-bold justify-center text-sm text-blue-500 bg-indigo-100">
                   <div>{index+1}</div>
               </div>
            </section>
                
            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.name}</div>
                </div>
            </section>
            <section className="w-2/12 flex justify-center text-md">
                <div className="flex flex-col items-center">
                <div className="text-xs">Certified Date:</div>
                    <div className="text-sm flex items-center justify-center ">
                        <div>{data.certifiedDate}</div>
                    </div>

                    
                </div>
            </section>



            <section className="w-2/12 rounded-l-full flex justify-center text-md" >
                <div className="flex flex-col items-center">
                <div className="text-xs">Issued By:</div>

                    <div className="text-sm flex items-center justify-center ">
                        <div>
                            {data.status}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.approvedRemark}</div>
                </div>
            </section>


            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
                    <div>{data.scannedFile}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="h-7 w-7 cursor-pointer">
                    <img src={DownloadIcon} alt=""/>
                </div>
            </section>
            
            

            
        </div>)
    }

    return (
        <div className="w-full flex flex-col items-center mx-3 py-8">
            {approved.map((data, index)=>renderData(data,index))}
        </div>
    )
}
