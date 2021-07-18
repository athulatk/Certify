import React from 'react'
import ApplicationModal from '../../components/ApplicationModal'
export default function Approved({approved}) {

    const renderData=(data, index)=>{
        return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 shadow-xl ring-blue-500 items-center justify-between w-full my-2">

            <section className="w-2/12 flex justify-center">
               <div className="h-7 w-7 rounded-full flex items-center font-bold justify-center text-sm text-blue-500 bg-indigo-100">
                   <div>{index+1}</div>
               </div>
            </section>
                
            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.category}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div className="capitalize text-blue-500 font-bold">Collect from {data.status} Office</div>
                </div>
            </section>

            {/* <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.application.category}</div>
                </div>
            </section> */}


            <section className="w-2/12 flex justify-center text-md">
                <div className="flex flex-col items-center">
                <div className="text-xs">Applied date:</div>
                    <div className="text-sm flex items-center justify-center ">
                        <div>{data.date.slice(0,10)}</div>
                    </div>

                    
                </div>
            </section>

            

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center font-bold text-blue-500">
                {/* <ApplicationModal data={data}/> */}
                {data.approved?
                <div className="text-green-500 capitalize m-1">
                    Approved
                </div>:
                <div>Status:&nbsp;Forwarded to <span className="capitalize m-1">{data.status}</span></div>
                }
                
                </div>
            </section>

        </div>)
    }

    return (
        <div className="w-full flex flex-col items-center mx-3 py-8">
            {approved?.map((data, index)=>renderData(data,index))}
        </div>
    )
}
