import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
export default function ChangePassword({pswd,user,setPswd}) {
    const backClick=(e)=>{
        if(e.target===e.currentTarget)
            setPswd(false)
    }
    const [showPassword,setShowPassword]=useState(false);
    var isValid=true;
    return (
        <div 
            className={
                "inset-0 fixed flex category justify-center items-center bg-white "+
                (pswd?" bg-opacity-80 ":" bg-opacity-0 hidden ")}
            onClick={backClick}
        >
            <section className={
                            "bg-blue-400 text-white rounded-xl flex flex-col category w-7/12 h-1/2"
                            +(pswd?" bg-opacity-100 ":" bg-opacity-0 hidden ") }>
                <div className="w-full flex justify-between pt-5 pr-5 border-b-2 border-white pb-4">
                        <div className="text-2xl font-semibold pl-10"> Change Password</div>
                        <div onClick={()=>{setPswd(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 hover:text-red-700 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                        </div>
                </div>

                <section className="h-full flex items-center pl-10">

                <form >
                
                <div className="form-group">
                <label style={{color:"black", paddingRight:"33px"}} items-center>Enter new password  </label>
                        <input style={{color:"black"}} placeholder="Enter password"
                                type={showPassword?"text":"password"} 
                                className="form-control"
                                />
                        <div 
                        className="visibility1" onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword?<VisibilityIcon style={{color:'#827876',position:"absolute", top:"10em",left:"10em"}}/>:<VisibilityOffIcon style={{color:'#827876',position:"absolute", top:"12.2em",left:"33.5em"}}/>}
                        </div>
                </div>
                <div className="form-group">
                <label style={{color:"black",paddingRight:"10px"}}>Re-Enter new password</label>
                        <input style={{color:"black"}} placeholder="Re-Enter password"
                                type={showPassword?"text":"password"}  className="form-control"
                        />
                        <div className="visibility2" onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword?<VisibilityIcon style={{color:'#827876', position:"absolute",top:"14.1em",left:"33.6em"}}/>:<VisibilityOffIcon style={{color:'#827876',position:"absolute",top:"14.1em",left:"33.6em"}}/>}
                        </div>
                </div>
                <Button className="button" color="primary" variant="contained"
                style={{textTransform:'capitalize',backgroundColor:'#4a8fff', float:'right'}}              
                  >Submit</Button>
                </form>
                </section>
            </section>
        </div>
    )
}

