import React, { useEffect, useState } from 'react'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import ProgressIcon from '../../assets/progress.svg'
import ReturnedIcon from '../../assets/returned.svg'
import ApprovedIcon from '../../assets/approved.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Recieved from '../Recieved/Recieved'
import Returned from '../Returned/Returned'
import Approved from '../Approved/Approved'
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux';
import axios from 'axios'
import { baseUrl } from '../../baseUrl';
import ChangePassword from '../../components/ChangePassword';



function Home(props) {

    const [applications,setApplications]=useState([]);
    const [recieved, setRecieved] = useState([])
    const [returned, setReturned] = useState([])
    const [approved, setApproved] = useState([])
    const [active, setActive] = useState("recieve")
    const [modifyCount, setModifyCount] = useState(0)
    const [loading,setLoading]=useState(true);
    const [pswd,setPswd] = useState(false)

    const history=useHistory();
    const addAdvisor = (e) =>{
        e.preventDefault();
        history.push('/addadvisor')
    }

    const user=props.user

    useEffect(() => {
        // console.log(location.state.user.batchId)
        console.log("myuser  : ",user)
        axios.get(`${baseUrl}/hod/applications?department=${user.department}`)
        .then(res=>{
            console.log(res)
            setApplications(res.data)
            setRecieved(res.data.filter((app)=>{return !app.application.returned && !app.application.approved && app.application.status==="hod"}))
            setReturned(res.data.filter((app)=>{return app.application.status==="hod"&&app.application.returned}))
            setApproved(res.data.filter((app)=>{return app.application.status==="principal" || app.application.status==="dean"}))
            setLoading(false);
        })
        .catch(err=>{
            console.error(err)
        })
    }, [modifyCount])

    return (
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <Navbar setPswd={setPswd}/>

            <ChangePassword
            pswd={pswd}
            setPswd={setPswd}
            />
                
            <div className="pl-9 w-full text-left text-xl">Dashboard</div>
            <section className="flex flex-col space-y-8 w-11/12 items-center ">
                <div className="flex items-center w-full justify-between">
                <div className="text-lg text-left">Welcome HOD {user.department}</div>
                <Button variant="contained" onClick={addAdvisor} style={{textTransform:'capitalize',outline:'none',backgroundColor:'#528CF8',color:'white',marginRight:'0.9em'}}>Add/View Staff Advisors</Button>
                </div>
                <section className="flex justify-between w-full  ">
                    <button 
                        className={"mr-3 focus:outline-none category "+(active==="recieve"?"dashboard-button-click":"dashboard-button ")}
                        onClick={()=>{setActive("recieve")}}>
                        <div className="flex w-full justify-end">
                            <img className="h-5 w-5 text-blue-500 focus:text-white" src={ProgressIcon} alt=""/>
                        </div>
                        
                        <div className="text-2xl font-bold">{recieved?.length}</div>
                        <div className="text-lg font-semibold">Applications Recieved</div>
                        <div className={active==="recieve"?"text-xs text-left visible":"text-xs text-left invisible"}>Total requests pending for approval</div>
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

                </section>

                {loading?<CircularProgress style={{marginTop:'5em'}}/>:
                <>
                {(active==="recieve")&&(<Recieved setModifyCount={setModifyCount} recieved={recieved}/>)}
                {(active==="returned")&&(<Returned returned={returned}/>)}
                {(active==="approved")&&(<Approved approved={approved}/>)}
                </>}
            </section>
        </div>
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