import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
export default function ChangePassword({pswd,user,setPswd}) {
    const backClick=(e)=>{
        if(e.target===e.currentTarget)
            setPswd(false)
    }
    const [showPassword,setShowPassword]=useState(false);
    var isValid=true;
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("")

    const submitHandler = (e)=>{
        e.preventDefault();
        if(password===confirmPassword){
            axios.post(`${baseUrl}/student/passwordChange`,{
                email:user.email,
                password:password
            })
            .then(res=>{
                console.log(res);
                setPassword("");
                setConfirmPassword("");
                setPswd(false);
            })
            .catch(err=>{
                console.error(err);
            })
        }
        else{
            alert('Password mismatch');
        }
        
    }


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

                <section className="h-full w-full bg-black-50 flex items-center pl-10">

                <form onSubmit={submitHandler} className="m-auto w-3/5">
                <div className="flex items-center justify-between w-full">
                <label className="text-white">Enter new password</label>
                <div className="relative">
                <input style={{color:"black"}} placeholder="Enter password"
                type={showPassword?"text":"password"} value={password}
                className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className="absolute cursor-pointer top-3 right-2" onClick={()=>setShowPassword(!showPassword)}>
                {showPassword?<VisibilityIcon style={{color:'#827876'}}/>:<VisibilityOffIcon style={{color:'#827876'}}/>}
                </div>
                </div>
                </div>
                <div className="flex items-center justify-between w-full mt-4">
                <label className="text-white">Re-Enter new password</label>
                <div className="relative">
                <input style={{color:"black"}} placeholder="Re-Enter password" value={confirmPassword}
                type={showPassword?"text":"password"}  className="form-control ml-17" 
                onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <div className="absolute cursor-pointer top-3 right-2" onClick={()=>setShowPassword(!showPassword)}>
                {showPassword?<VisibilityIcon style={{color:'#827876'}}/>:<VisibilityOffIcon style={{color:'#827876'}}/>}
                </div>
                </div>
                </div>
                <div className="w-full flex items-center justify-center mt-6">
                <Button className="m-auto" type="submit" color="primary" variant="contained"
                style={{textTransform:'capitalize',backgroundColor:'white',color:'#4a8fff'}}              
                  >Submit</Button>
                </div>
                </form>
                </section>
            </section>
        </div>
    )
}

