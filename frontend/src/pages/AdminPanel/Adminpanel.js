import React,{useState,useEffect} from 'react'
import ApNavbar from './ApNavbar'
import PrincipalCard from './PrincipalCard'
import DeanCard from './DeanCard'
import HodCard from './HodCard'
import {Button} from '@material-ui/core'
import HodModal from './HodModal'
import axios from 'axios'
import {baseUrl} from '../../baseUrl'

function Adminpanel() {

    const[hods,setHods]=useState([]);
    const[details,setDetails]=useState({
        department:"AEI",
        email:"",
        password:""
    })
    useEffect(() => {
        axios.get(`${baseUrl}/admin/hods`)
        .then((res)=>{
            console.log(res.data);
            setHods(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }, [])


    return (


            <div className="flex flex-col text-black w-full items-center space-y-8">
                <ApNavbar/>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex flex-row w-full justify-around p-5">

                    <PrincipalCard/>
                    <DeanCard />

                </div>
                <div className="underline ">Head of the department(HOD)</div>
                 {/* <div className="w-full flex flex-row-reverse mr-10"> <Button  style={{textTransform:'capitalize',backgroundColor:'#4a86f7',color:'white',border:'none',margin:'5px'}}>Add HOD </Button> 
</div> */}
                <HodModal details={details} setDetails={setDetails} setHods={setHods}/>
                <div className="w-full px-5 ">
                    {
                        hods.map(hod=>{
                            return(<HodCard email={hod.email} department={hod.department}/>)
                        })
                    }
                    
                </div>
                <div></div>
            </div>
            

    )
}

export default Adminpanel
