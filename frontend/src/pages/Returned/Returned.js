import React from 'react'
import EditIcon from '../../assets/edit.svg'

export default function Returned({returned}) {

    const renderData=(data, index)=>{
        return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 ring-blue-500 shadow-xl items-center justify-between w-full my-2">

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



            <section className="w-2/12 rounded-l-full flex justify-center text-md" >

                    <div className="text-sm flex items-center justify-center pr-3">
                        <div>
                            {data.student.semester}-{data.student.department}
                        </div>
                    </div>

            </section>
            <section className="w-2/12 flex justify-center">
                <div className="text-xs flex items-center justify-center ">
                    <div>{data.application.feedback}</div>
                </div>
            </section>
            

            <section className="w-2/12 flex justify-center">
                <div className="h-7 w-7 cursor-pointer">
                    <img src={EditIcon} alt=""/>
                </div>
            </section>
        </div>)
    }

    return (
        <div className="w-full flex flex-col items-center mx-3 py-8">
            {returned.map((data, index)=>renderData(data,index))}
        </div>
    )
}
