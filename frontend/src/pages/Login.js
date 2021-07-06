import React, { useState } from 'react'
import Loginform from '../components/Loginform'
import './css/Loginpage.css'
import Logo from '../assets/logo.svg'
import Topcorner from '../assets/topcorner.svg'
import Bottomcorner from '../assets/bottomcorner.svg'
import Back from '../assets/background-obj.svg'
import Home from './Home/Home'

function Login() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <div className="login_page">
            <img src={Back} alt="" id="objects"/>
            <img src={Topcorner} alt="" id="topcorner"/>
            <img src={Bottomcorner} alt="" id="bottomcorner"/>
            <div className="w-9/12">
            <img src={Logo} alt="" id="logo"/>
            <Loginform setLoggedIn={setLoggedIn} setUser={setUser}/>
            </div>
        </div>
    )
}

export default Login
