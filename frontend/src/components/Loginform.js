import React,{useEffect, useState} from 'react'
import './Loginform.css'
import {Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
function Loginform(props) {

    const [showPassword,setShowPassword]=useState(false);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginType,setLoginType]=useState("")
    const history=useHistory();

    useEffect(() => {
        // axios.defaults.withCredentials = true;
        axios.get('http://localhost:8080/checkAuthenticated',{withCredentials: false})
        .then(res=>{
            console.log(res.data)
            history.push('/home')
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    const Login = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/student/login',
            {
                email:email,
                password:password
            },
            {
                withCredentials:true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Access-Control-Allow-Credentials':true,
                    'Content-Type': 'application/json'
                }
            }
        ).then(res=>{
            console.log(res.data)
            // props.setUser(res.data)
            // props.setLoggedIn(true)
            history.push({pathname:'/home',state:{user:res.data}})
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="login__outerdiv" style={loginType?{height:'320px'}:{height:'190px'}}>
            <div className="login__side">
            <h4 className="text-lg font-bold">No more hassle for certificates!</h4>
            </div>
         <div className="login__div">
             {loginType?
             <div>
             <h2 style={{fontSize:'23px'}}>{loginType} Login</h2>
             <hr/>
             <h5>Welcome Back!</h5>
             <p style={{fontSize:'12px',marginBottom:'0.5em'}}>Please log in to your account</p>
             <form className="login__form">
                 <div className="login__inputs">
                     <div>
                         <label>Email</label><br/>
                         <input 
                             value={email} 
                             onChange={e=>{setEmail(e.target.value)}} 
                             type="email" 
                             size="30" 
                             placeholder="Enter Email"/>
                     </div>
 
                     <div>
                         <label>Password</label><br/>
                         <div className="passwordcomp">
                             <input 
                                 value={password} 
                                 onChange={e=>{setPassword(e.target.value)}} 
                                 type={showPassword?"text":"password"} 
                                 size="30" 
                                 placeholder="Enter password"/>
 
                             <div className="icon" onClick={()=>setShowPassword(!showPassword)}>
                                 {showPassword?<VisibilityIcon style={{color:'#827876'}}/>:<VisibilityOffIcon style={{color:'#827876'}}/>}
                             </div>
                         </div>
                     </div>
                 </div>
                <div className="buttons">
                    <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none',marginLeft:'0'}}
                     onClick={()=>setLoginType("")}>
                    <ArrowBackIosIcon style={{fontSize:'18px'}}/> Back</Button>

                 <div className="login__buttons">
                     <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none'}}>Recover Password</Button>
                     <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7'}} onClick={Login}>Login</Button>
                 </div>
                 </div>
             </form>
             </div>
             
             :

             <div>
             <h2 style={{fontSize:'23px'}}>Login as:</h2>
             <select name="certificate" className="ml-5 mt-6 p-1 w-4/12 rounded-md border-blue-500" required onChange={(e)=>setLoginType(e.target.value)}>
                     <option value="">Select role</option> 
                     <option value="Student">Student</option>
                     <option value="Staff Advisor">Staff Advisor</option>
                     <option value="HOD">HOD</option>
                     <option value="Principal">Principal</option>
                     <option value="U.G Dean">U.G Dean</option>
                 </select>
                 {/* <div className="login__buttons">
                     <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7'}}><ArrowForwardIosIcon style={{fontSize:'18px'}} onClick={()=>setConfirmLogin(loginType)}/> Next</Button>
                 </div> */}
             </div>
             
             }
            
        </div>

        </div>
    )
}

export default Loginform
