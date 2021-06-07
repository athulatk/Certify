import React from 'react'
import DownloadIcon from '../../assets/download.svg'

export default function InProgress({inProgress}) {

    const renderData=(data, index)=>{
        return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 ring-blue-500 items-center justify-between w-full my-2">

            <section className="w-2/12 flex justify-center">
               <div className="h-7 w-7 rounded-full flex items-center justify-center text-sm bg-gray-400">
                   <div>{index}</div>
               </div>
            </section>
                
            <section className="w-2/12 flex justify-center">
                <div className="text-md flex items-center justify-center ">
                    <div>{data.name}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-md flex items-center justify-center ">
                    <div>{data.category}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center text-md">
                <div className="flex flex-col items-center">
                    <div className="text-md flex items-center justify-center ">
                        <div>{data.date}</div>
                    </div>

                    <div className="text-md">Applied date</div>
                </div>
            </section>

            <section className="w-2/12 rounded-l-full flex justify-center text-md" >
                <div className={data.returned&&("flex items-center rounded-l-full rounded-r-full space-x-2 bg-red-400")}>
                    {data.returned&&(
                        <div className="rounded-full h-7 w-7 bg-red-600 flex items-center justify-center ">
                            <div className="p-4">R</div>
                        </div>
                    )}
                    <div className="flex items-center justify-center pr-3">
                        <div>
                            {data.status}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="text-md flex items-center justify-center text-blue-500">
                    <div>{data.letter}</div>
                </div>
            </section>

            <section className="w-2/12 flex justify-center">
                <div className="h-7 w-7">
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
