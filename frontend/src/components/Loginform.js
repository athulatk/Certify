import React,{useState} from 'react'
import './Loginform.css'
import {Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
function Loginform() {

    const [showPassword,setShowPassword]=useState(false);
    const history=useHistory();

    const Login = (e) =>{
        e.preventDefault();
        history.push('/home')
    }
    return (
        <div className="login__outerdiv">
            <div className="login__side">
            <h4>Welcome back!</h4>
            </div>
        <div className="login__div">
            <h2 style={{fontSize:'23px'}}>Login</h2>
            <hr/>
            <h5>Welcome Back!</h5>
            <p style={{fontSize:'12px',marginBottom:'0.5em'}}>Please log in to your account</p>
            <form className="login__form">
                <div className="login__inputs">
                <div>
                <label>UserId</label><br/>
                <input type="text" size="30" placeholder="Enter userid"/>
                </div>
                <div>
                <label>Password</label><br/>
                <div className="passwordcomp">
                <input type={showPassword?"text":"password"} size="30" placeholder="Enter password"/>
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
