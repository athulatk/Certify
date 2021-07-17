import React from 'react'
import DownloadIcon from '../../assets/download.svg'

export default function InProgress({inProgress}) {

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
                    <div>{data.category}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center text-md">
                <div className="flex flex-col items-center">
                <div className="text-xs">Applied date:</div>
                    <div className="text-sm flex items-center justify-center ">
                        <div>{data.date.slice(0,10)}</div>
                    </div>

                    
                </div>
            </section>

            <section className="w-2/12 rounded-l-full flex justify-center text-md" >
                <div className={data.returned&&("flex items-center rounded-l-full rounded-r-full space-x-2 bg-red-400")}>
                    {data.returned&&(
                        <div className="rounded-full h-7 w-7 bg-red-600 flex items-center justify-center ">
                            <div className="p-4">R</div>
                        </div>
                    )}
                    <div className="text-sm flex items-center justify-center pr-3">
                        <div style={{textTransform:'capitalize'}}>
                            {data.status}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
                    <div>Letter</div>
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
            {inProgress.map((data, index)=>renderData(data,index))}
        </div>
    )
}
