import React, { useEffect, useState } from 'react'
import ProgressIcon from '../../assets/progress.svg'
import ReturnedIcon from '../../assets/returned.svg'
import ApprovedIcon from '../../assets/approved.svg'
import ApplyIcon from '../../assets/apply.svg'
import DummyData from './HomeDummyData'
import InProgress from '../InProgress/InProgress'
import Returned from '../Returned/Returned'
import Approved from '../Approved/Approved'
import Apply from '../Apply/Apply'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function Home() {

    const [inProgress, setInProgress] = useState([])
    const [returned, setReturned] = useState([])
    const [approved, setApproved] = useState([])
    const [active, setActive] = useState("progress")
    const [sideBar, setSideBar] = useState(false)

    useEffect(() => {
        const mydata=DummyData;
        
        var myProgress=[]
        var myReturned=[]
        var myApproved=[]
        mydata.forEach(item=>
        {
            console.log(item)
            if(item.inProgress)
                myProgress.push(item)
            if(item.returned)
                myReturned.push(item)
            if(item.approved)
                myApproved.push(item)
        })
        setInProgress(myProgress)
        setReturned(myReturned)
        setApproved(myApproved)
        console.log(mydata)
    }, [DummyData])

    return (

        <section className="flex flex-col w-full">
            <div className="w-full flex flex-col justify-start">
                <Navbar setSideBar={setSideBar}/>

                <div className={"relative transition duration-500 ease-in-out bg-gray-100  py-10 px-2 "+(sideBar?"w-2/12":"w-0 hidden")}>
                    <Sidebar/>
                </div>
            </div>

            <div className="flex flex-col text-black w-full items-center space-y-8">
                    
                <div className="pl-9 w-full text-left text-xl">Dashboard</div>
                <section className="flex flex-col space-y-8 w-11/12 items-center ">
                    <div className="text-lg text-left w-full">Welcome Peter</div>
                    <section className="flex justify-between w-full  ">
                        <button 
                            className={"mr-3 focus:outline-none category "+(active==="progress"?"dashboard-button-click":"dashboard-button ")}
                            onClick={()=>{setActive("progress")}}>
                            <div className="flex w-full justify-end">
                                <img className="h-5 w-5 text-blue-500 focus:text-white" src={ProgressIcon} alt=""/>
                            </div>
                            
                            <div className="text-2xl font-bold">{inProgress.length}</div>
                            <div className="text-lg font-semibold">In Progress</div>
                            <div className={active==="progress"?"text-xs text-left visible":"text-xs text-left invisible"}>Details about the progress of certificates</div>
                        </button>

                        <button 
                            className={"mx-3 focus:outline-none category "+(active==="returned"?"dashboard-button-click":"dashboard-button ")}
                            onClick={()=>{setActive("returned")}}>
                            <div className="flex w-full justify-end">
                                <img className="h-5 w-5" src={ReturnedIcon} alt=""/>
                            </div>
                            <div className="text-2xl font-bold">{returned.length}</div>
                            <div className="text-lg font-semibold">Returned</div>
                            <div className={active==="returned"?"text-xs text-left visible":"text-xs text-left invisible"}>Details of the certificate which are returned.</div>
                        </button>

                        <button 
                            className={"mx-3 focus:outline-none category "+(active==="approved"?"dashboard-button-click":"dashboard-button ")}
                            onClick={()=>{setActive("approved")}}>
                            <div className="flex w-full justify-end">
                                <img className="h-5 w-5" src={ApprovedIcon} alt=""/>
                            </div>
                            <div className="text-2xl font-bold">{approved.length}</div>
                            <div className="text-lg font-semibold">Approved</div>
                            <div className={active==="approved"?"text-xs text-left visible":"text-xs text-left invisible"}>Details of the certificate which are approved.</div>
                        </button>

                        <button 
                            className={"ml-3 focus:outline-none category "+(active==="apply"?"dashboard-button-click":"dashboard-button ")}
                            onClick={()=>{setActive("apply")}}>
                            <div className="flex w-full justify-end">
                            <img className="h-5 w-5" src={ApplyIcon} alt=""/>
                            </div>
                            <div className="text-lg font-semibold pt-8 text-left">Submit New Application</div>
                            <div className={active==="apply"?"text-xs text-left visible":"text-xs text-left invisible"}>Submit application for new certificate.</div>
                        </button>
                    </section>

                    {(active==="progress")&&(<InProgress inProgress={inProgress}/>)}
                    {(active==="returned")&&(<Returned returned={returned}/>)}
                    {(active==="approved")&&(<Approved approved={approved}/>)}
                    {(active==="apply")&&(<Apply/>)} 
                </section>
            </div>
        </section>
    )
}
