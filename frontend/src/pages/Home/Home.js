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
import Profile from '../../components/Profile'
import ChangePassword from '../../components/ChangePassword'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';

function Home(props) {

    const [inProgress, setInProgress] = useState([])
    const [returned, setReturned] = useState([])
    const [approved, setApproved] = useState([])
    const [active, setActive] = useState("progress")
    const [modalActive, setModalActive] = useState(false)
    const [pswd,setPswd] = useState(false)

    // const user=useSelector(state=>state.user)

    const location=useLocation();
    useEffect(() => {

        if(location.state.user.loginCount===0){
            setPswd(true);
        }
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
        <section className="w-full">
            <Profile 
                // user={
                //         {name:"shuhaib", 
                //         semester:"s6", 
                //         department:"cse",
                //         regNo:"TVE18CS061",
                //         advisors:[
                //             "sreelal",
                //             "preethi"
                //         ]}
                //     } 
                // user={user}
                user={props.user}
                modalActive={modalActive}
                setModalActive={setModalActive}
            />

            <ChangePassword
            user={location.state.user}
            pswd={pswd}
            setPswd={setPswd}
            />

            <div className="flex flex-col text-black w-full items-center space-y-8">
                <Navbar setModalActive={setModalActive} setPswd={setPswd}/>
                    
                <div className="pl-9 w-full text-left text-xl">Dashboard</div>
                <section className="flex flex-col space-y-8 w-11/12 items-center ">
                    <div className="text-lg text-left w-full">Welcome {location.state.user.name}</div>
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
                    {(active==="apply")&&(<Apply user={location.state.user}/>)} 
                </section>
            </div>
        </section>
    )
}


//redux
const mapStateToProps = state =>{
    return {
        user:state.user
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);