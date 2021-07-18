import React,{useEffect, useState} from 'react'
import './Loginform.css'
import {Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import {userLogin} from '../redux/UserActions'

export default function Loginform(props) {

    const [showPassword,setShowPassword]=useState(false);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginType,setLoginType]=useState("")
    const history=useHistory();

    // const dispatch=useDispatch())

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
        
        axios.post(`http://localhost:8080/${loginType}/login`,
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
            props.dispatch({
                ...userLogin(),
                user:res.data,
                loggedIn:loginType
            })
            history.push({pathname:`/${loginType}/home`,state:{user:res.data}})
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="flex transition-height duration-300 login__outerdiv rounded-3xl" style={loginType?{height:'320px'}:{height:'190px'}}>
            <div className="flex flex-col items-center rounded-l-3xl login__side justify-center w-4/12">
            <h4 className="text-lg text-white font-bold">No more hassle for certificates!</h4>
            </div>
         <div className="w-8/12 flex flex-col justify-center px-7 rounded-r-xl bg-white">
             {loginType?
             <div>
             <h2 className='capitalize text-xl font-semibold text-blue-400'>{loginType} Login</h2>
             <hr/>
             <h5 className='mt-3'>Welcome Back!</h5>
             <p className='mb-2 text-sm'>Please log in to your account</p>
             <form className="flex flex-col justify-center mt-4">
                 <div className="flex items-center justify-between">
                     <div className="w-6/12">
                         <label>Email</label><br/>
                         <div className="w-full">
                         <input 
                             value={email}
                             className="myinput w-full" 
                             onChange={e=>{setEmail(e.target.value)}} 
                             type="email" 
                             placeholder="Enter Email"/>
                        </div>
                     </div>
 
                     <div className="w-6/12 ml-5">
                         <label>Password</label><br/>
                        <div className="passwordcomp w-full">
                             <input 
                                 value={password} 
                                 className="myinput w-full" 
                                 onChange={e=>{setPassword(e.target.value)}} 
                                 type={showPassword?"text":"password"} 
                                 placeholder="Enter password"/>
 
                             <div className="absolute cursor-pointer top-3 right-2" onClick={()=>setShowPassword(!showPassword)}>
                                 {showPassword?<VisibilityIcon style={{color:'#827876'}}/>:<VisibilityOffIcon style={{color:'#827876'}}/>}
                             </div>
                        </div>
                     </div>
                 </div>
                <div className="flex items-center justify-between mt-6">
                    <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none',marginLeft:'0'}}
                     onClick={()=>setLoginType("")}>
                    <ArrowBackIosIcon style={{fontSize:'18px'}}/> Back</Button>

                 <div className="flex items-center">
                     <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none'}}>Recover Password</Button>
                     <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7',marginLeft:'1.5em'}} onClick={Login}>Login</Button>
                 </div>
                 </div>
             </form>
             </div>
             
             :

             <div>
             <h2 className='capitalize text-xl font-semibold text-blue-400'>Login as:</h2>
             <select name="certificate" className="ml-5 mt-6 p-1 w-4/12 rounded-md border-blue-500" required onChange={(e)=>setLoginType(e.target.value)}>
                     <option value="">Select role</option> 
                     <option value="student">Student</option>
                     <option value="advisor">Staff Advisor</option>
                     <option value="hod">HOD</option>
                     <option value="authority">Principal/Dean</option>
                     {/* <option value="dean">U.G Dean</option> */}
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