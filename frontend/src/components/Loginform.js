import React,{useEffect, useState} from 'react'
import './Loginform.css'
import {Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
function Loginform(props) {

    const [showPassword,setShowPassword]=useState(false);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const history=useHistory();

    useEffect(() => {
        axios.get('http://localhost:8080/checkAuthenticated',{withCredentials: true})
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
            }
        ).then(res=>{
            console.log(res.data)
            history.push('/home')
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="login__outerdiv">
            <div className="login__side">
            <h4 className="text-lg font-bold">No more hassle for certificates!</h4>
            </div>
        <div className="login__div">
            <h2 style={{fontSize:'23px'}}>Login</h2>
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

                <div className="login__buttons">
                    <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none'}}>Recover Password</Button>
                    <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7'}} onClick={Login}>Login</Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Loginform
