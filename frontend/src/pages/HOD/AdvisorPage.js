import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar'
import FormModal from './FormModal'
import Team from '../../assets/addteam.svg'
import AdvisorCard from '../../components/AdvisorCard'
import axios from 'axios'
import {baseUrl} from '../../baseUrl'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

function AdvisorPage(props) {
    const[loading,setLoading]=useState('true')
    const[advisors,setAdvisors]=useState([]);
    const[details,setDetails]=useState({
        name:"",
        semester:"S1",
        email:"",
        password:""
    })

    useEffect(() => {
        
        const user=props.user

        axios.get(`${baseUrl}/hod/staffadvisors`)
        .then((res)=>{
            setLoading(false)
            console.log(res.data);
            setAdvisors(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }, [])
    return (
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <Navbar/>
            {loading?<CircularProgress style={{position:'absolute',top:'30%'}}/>:
            advisors.length===0?
            <div className="flex flex-col items-center justify-center">
            <img src={Team} alt="" style={{width:'350px',marginRight:'0.5em'}}/>
            <p className="mt-10 mb-8">No staff advisors are added.</p>
            <FormModal details={details} setDetails={setDetails} setAdvisors={setAdvisors}/>
            </div>
            :
            <div className="w-11/12">
            <div className="flex items-center justify-between mb-7 ml-2 mr-2">
            <h2 className="text-xl font-semibold">Staff Advisors - CSE</h2>
            <FormModal details={details} setDetails={setDetails} setAdvisors={setAdvisors}/>
            </div>
            <div className="grid gap-4 grid-cols-3">
            {
                advisors.map(
                    (advisor,index) => (
                        <AdvisorCard index={index} name={advisor.name} email={advisor.email} semester={advisor.batchId.semester}/>
                    )
                )
                
            }
            </div>
            </div>

            }           
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
export default connect(mapStateToProps, mapDispatchToProps)(AdvisorPage);