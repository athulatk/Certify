import React from 'react'
import ApplicationModal from '../../components/ApplicationModal'
export default function Recieved({recieved}) {

    const renderData=(data, index)=>{
        return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 shadow-xl ring-blue-500 items-center justify-between w-full my-2">

            <section className="w-2/12 flex justify-center">
               <div className="h-7 w-7 rounded-full flex items-center font-bold justify-center text-sm text-blue-500 bg-indigo-100">
                   <div>{index+1}</div>
               </div>
            </section>
                
            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.student.name}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.student.semester}</div> - <div>{data.student.department}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.application.category}</div>
                </div>
            </section>


            <section className="w-2/12 flex justify-center text-md">
                <div className="flex flex-col items-center">
                <div className="text-xs">Applied date:</div>
                    <div className="text-sm flex items-center justify-center ">
                        <div>{data.application.date.slice(0,10)}</div>
                    </div>

                    
                </div>
            </section>

            

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
                <ApplicationModal data={data}/>
                </div>
            </section>

        </div>)
    }

    return (
        <div className="w-full flex flex-col items-center mx-3 py-8">
            {recieved?.map((data, index)=>renderData(data,index))}
        </div>
    )
}
