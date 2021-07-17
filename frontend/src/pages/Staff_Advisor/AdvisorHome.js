import React, { useEffect, useState } from 'react'
import {Button} from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';
import ProgressIcon from '../../assets/progress.svg'
import ReturnedIcon from '../../assets/returned.svg'
import ApprovedIcon from '../../assets/approved.svg'
import Recieved from '../Recieved/Recieved'
import Returned from '../Returned/Returned'
import Approved from '../Approved/Approved'
import Navbar from '../../components/Navbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import XLSX from 'xlsx'
import axios from 'axios'
import { baseUrl } from '../../baseUrl';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';


function AdvisorHome(props) {

    const [applications,setApplications]=useState([]);
    const [loading,setLoading]=useState(true)
    const [recieved, setRecieved] = useState([]);
    const [returned, setReturned] = useState([])
    const [approved, setApproved] = useState([])
    const [active, setActive] = useState("recieve")
    const [isuploaded,setisUploaded]=useState("false");
    const [fileuploaded,setfileUploaded]=useState(null);
    const [studentData,setStudentData]=useState([])
    const [modifyCount, setModifyCount] = useState(0) //approve count for updating the application llist after updating
                                                        //Used in useEffect below
    // const `loca`tion=useLocation();

    const user=props.user


    useEffect(() => {
        console.log("user.batchid : ",user.batchId)
        axios.get(`${baseUrl}/advisor/application?batchId=${user.batchId}`)
        .then(res=>{
            console.log(res)
            setApplications(res.data)
            console.log(applications)
            setRecieved(res.data.filter((app)=>app.application.status==="Staff Advisor"))
            setReturned(res.data.filter((app)=>{return app.application.returned&&app.application.status==="Staff Advisor"}))
            setApproved(res.data.filter((app)=>app.application.status!=="Staff Advisor"))
            setLoading(false)
        })
        .catch(err=>{
            console.error(err)
        })
    }, [modifyCount])

    useEffect(() => {
        if(studentData.length!==0){

            var studentRegisterObj={
                advisorUser:user, 
                studentData:studentData
            }

            axios.post(`${baseUrl}/advisor/student/register`,studentRegisterObj)
            .then(res=>{
                console.log(res);
                alert("Data Uploaded Successfully!!")
            })
            .catch(err=>{
                console.log(err);
            })}
    }, [studentData])

        
    const fileUpload=(e)=>{
        const uploadedfile=e.target.files[0];
        console.log(e.target.files[0])
        if(uploadedfile){
            setfileUploaded(uploadedfile)
            setisUploaded(true)
            const reader=new FileReader();
            reader.onload = (e)=>{
                const bstr = e.target.result;
                const workbook = XLSX.read(bstr, { type: "binary" });
                var worksheet = workbook.Sheets['Sheet1'];
                
                //getting the complete sheet
                // console.log(worksheet);
  
                var headers = {};
                var data = [];
                for (var z in worksheet) {
                    if (z[0] === "!") continue;
                    //parse out the column, row, and value
                    var col = z.substring(0, 1);
                    // console.log(col);
                
                    var row = parseInt(z.substring(1));
                    // console.log(row);
                
                    var value = worksheet[z].v;
                    // console.log(value);
                
                    //store header names
                    if (row == 1) {
                        headers[col] = value;
                        // storing the header names
                        continue;
                    }
                
                    if (!data[row]) data[row] = {};
                    data[row][headers[col]] = value;
                }
                //drop those first two rows which are empty
                data.shift();
                data.shift();
                console.log(data);
                setStudentData(data);  
            }
            reader.readAsBinaryString(uploadedfile);
        }

    }

    return (
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <Navbar/>
                
            <div className="pl-9 w-full text-left text-xl">Dashboard</div>
            <section className="flex flex-col space-y-8 w-11/12 items-center ">
                <div className="flex items-center w-full justify-between">
                <div className="text-lg text-left">Welcome {user.name}</div>
                <div>
                <input
                    accept=".xlsx"
                    style={{display:'none'}}
                    id="contained-button-file"
                    type="file"
                    onChange={fileUpload}
                />
                <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" style={{textTransform:'capitalize',outline:'none',backgroundColor:'#528CF8',color:'white',marginRight:'0.9em'}} component="span">
                <PublishIcon/> Upload Student Data (Excel)
                </Button>
                </label>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorHome);