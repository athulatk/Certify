import React from 'react'
import './Loginform.css'
import {Button,TextField} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
function Loginform() {
    return (
        <div className="login__outerdiv">
            <div className="login__side">
            <h4>Welcome back!</h4>
            </div>
        <div className="login__div">
            <h3>Login</h3>
            <hr/>
            <h5>Welcome Back!</h5>
            <p style={{fontSize:'12px',marginBottom:'0.5em'}}>Please log in to your account</p>
            <form className="login__form">
                <div className="login__inputs">
                <div>
                <label>UserId</label><br/>
                <input type="text" size="40" placeholder="Enter userid"/>
                {/* <TextField id="outlined-basic" label="UserId" variant="outlined" /> */}
                </div>
                <div>
                <label>Password</label><br/>
                <input type="password" size="40" placeholder="Enter password"/>
                {/* <TextField id="outlined-basic" type="password" label="Password" variant="outlined"/> */}
                {/* <VisibilityOffIcon/> */}
                </div>
                </div>
                <div className="login__buttons">
                <Button style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a86f7',border:'none'}}>Recover Password</Button>
                <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:'#4a86f7'}}>Login</Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Loginform
