import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import ProgressIcon from '../../assets/progress.svg'
import ReturnedIcon from '../../assets/returned.svg'
import ApprovedIcon from '../../assets/approved.svg'
import ApplyIcon from '../../assets/apply.svg'
import SearchIcon from '../../assets/search.svg'
import DummyData from './HomeDummyData'
import InProgress from '../InProgress/InProgress'

export default function Home() {

    const [inProgress, setInProgress] = useState([])
    const [returned, setReturned] = useState([])
    const [approved, setApproved] = useState([])
    const [active, setActive] = useState("progress")

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
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <section className="w-full flex justify-between items-center pt-4 px-8">
                <img src={Logo} alt="" id="logo"/>

                <div className="flex space-x-2">
                    <img src={SearchIcon} alt=""/>

                    <div className="rounded-full text-center text-sm h-10 w-10 ring-blue ring-2 pt-3">
                        S4A
                    </div>
                </div>
            </section>
                
            <div className="pl-9 w-full text-left text-xl">Dashboard</div>

            <section className="flex flex-col space-y-8 w-11/12 items-center">
                <div className="text-lg text-left w-full">Welcome Peter</div>
                <section className="flex justify-between w-full">
                    <button 
                        className={"mr-3 focus:outline-none "+(active==="progress"?"dashboard-button-click":"dashboard-button ")}
                        onClick={()=>{setActive("progress")}}>
                        <div className="flex w-full justify-end">
                            <img className="h-5 w-5 text-blue-500 focus:text-white" src={ProgressIcon} alt=""/>
                        </div>
                        
                        <div className="text-2xl font-bold">{inProgress.length}</div>
                        <div className="text-lg font-semibold">In Progress</div>
                        <div className="text-sm text-left">Details about the progress of the certificate</div>
                    </button>

                    <button 
                        className={"mx-3 focus:outline-none "+(active==="returned"?"dashboard-button-click":"dashboard-button ")}
                        onClick={()=>{setActive("returned")}}>
                        <div className="flex w-full justify-end">
                            <img className="h-5 w-5" src={ReturnedIcon} alt=""/>
                        </div>
                        <div className="text-2xl font-bold">{returned.length}</div>
                        <div className="text-lg font-semibold">Returned</div>
                    </button>

                    <button 
                        className={"mx-3 focus:outline-none "+(active==="approved"?"dashboard-button-click":"dashboard-button ")}
                        onClick={()=>{setActive("approved")}}>
                        <div className="flex w-full justify-end">
                            <img className="h-5 w-5" src={ApprovedIcon} alt=""/>
                        </div>
                        <div className="text-2xl font-bold">{approved.length}</div>
                        <div className="text-lg font-semibold">Approved</div>
                    </button>

                    <button 
                        className={"ml-3 focus:outline-none "+(active==="apply"?"dashboard-button-click":"dashboard-button ")}
                        onClick={()=>{setActive("apply")}}>
                        <div className="flex w-full justify-end">
                          <img className="h-5 w-5" src={ApplyIcon} alt=""/>
                        </div>
                        <div className="text-lg font-semibold pt-8 text-left">Apply for certificates</div>
                    </button>
                </section>

                {(active==="progress")&&(<InProgress inProgress={inProgress}/>)}
            </section>
        </div>
    )
}
