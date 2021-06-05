import React from 'react'
import Loginform from '../components/Loginform'
import './css/Loginpage.css'
import Logo from '../assets/logo.svg'
import Topcorner from '../assets/topcorner.svg'
import Bottomcorner from '../assets/bottomcorner.svg'
import Back from '../assets/background-obj.svg'
function Login() {
    return (
        <div className="login_page">
            <img src={Back} alt="" id="objects"/>
            <img src={Topcorner} alt="" id="topcorner"/>
            <img src={Bottomcorner} alt="" id="bottomcorner"/>
            <div>
            <img src={Logo} alt="" id="logo"/>
            <Loginform/>
            </div>
        </div>
    )
}

export default Login
