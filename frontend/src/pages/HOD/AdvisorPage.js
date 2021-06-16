import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import Navbar from '../../components/Navbar'
import FormModal from './FormModal'
import Empty from '../../assets/empty.svg'
import Team from '../../assets/addteam.svg'


const AdvisorDetails=(data, index)=>{
    return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 shadow-xl ring-blue-500 items-center justify-between w-full my-2">

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

        <section className="w-2/12 flex justify-center">
            <div className="text-sm flex items-center justify-center ">
                <div>{data.category}</div>
            </div>
        </section>

        <section className="w-2/12 flex justify-center text-md">
            <div className="flex flex-col items-center">
            <div className="text-xs">Applied date:</div>
                <div className="text-sm flex items-center justify-center ">
                    <div>{data.date}</div>
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
                    <div>
                        {data.status}
                    </div>
                </div>
            </div>
        </section>

        <section className="w-2/12 flex justify-center">
            <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
                <div>{data.letter}</div>
            </div>
        </section>

        <section className="w-2/12 flex justify-center">
            <div className="h-7 w-7 cursor-pointer">
                <img src="" alt=""/>
            </div>
        </section>
    </div>)
}





function AdvisorPage() {
    const[advisors,setAdvisors]=useState([]);
    return (
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <Navbar/>
            {advisors.length?
            <div className="w-11/12">
            <h2 className="text-left w-11/12">List of Staff Advisors</h2>
            {
                advisors.map(
                    advisor => (
                        <AdvisorDetails/>
                    )
                )
            }
            
            </div>:
            <div className="flex flex-col items-center justify-center">
                <img src={Team} alt="" style={{width:'350px',marginRight:'0.5em'}}/>
                <p className="mt-10">No staff advisors are added.</p>
                </div>}
            <FormModal/>
            
        </div>
    )
}

export default AdvisorPage
