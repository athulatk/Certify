import React from 'react'
import './Loginform.css'
import {Button} from '@material-ui/core'
function Loginform() {
    return (
        <div className="login__div">
            <h2>Certify</h2>
            <hr/>
            <h5>Welcome Back!</h5>
            <h6>Please sign in to your account</h6>
            <form className="login__form">
                <div className="login__inputs">
                <div>
                <label>UserId</label><br/>
                <input type="text"/>
                </div>
                <div>
                <label>Password</label><br/>
                <input type="password"/>
                </div>
                </div>
                <hr/>
                <div className="login__buttons">
                <Button variant="contained" color="primary" style={{textTransform:'capitalize'}}>Recover Password</Button>
                <Button variant="contained" color="primary" style={{textTransform:'capitalize'}}>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Loginform
