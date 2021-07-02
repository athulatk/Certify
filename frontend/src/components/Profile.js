import React from 'react'

export default function Profile({modalActive, user, setModalActive}) {

    const backClick=(e)=>{
        if(e.target===e.currentTarget)
            setModalActive(false)
    }

    return (
        <div 
            className={
                "inset-0 fixed flex category justify-center items-center bg-white "+
                (modalActive?" bg-opacity-80 ":" bg-opacity-0 hidden ")}
            onClick={backClick}
        >
            <section className={
                            "bg-blue-400 text-white rounded-xl flex flex-col category w-7/12 h-1/2"
                            +(modalActive?" bg-opacity-100 ":" bg-opacity-0 hidden ") }>
                <div className="w-full flex justify-between pt-5 pr-5 border-b-2 border-white pb-4">
                        <div className="text-2xl font-semibold pl-10">Hey :) This is what I know about you!</div>
                        <div onClick={()=>{setModalActive(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 hover:text-red-700 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                        </div>
                </div>

                <section className="h-full flex items-center pl-10">

                        <div className="grid grid-cols-2 gap-3 w-10/12">
                        {user.name&&(
                                <span className="text-xl font-bold">Name</span> 
                        )}
                        {user.name&&(
                                <span className="font-bold">: {user.name}</span>
                        )}

                        {user.department&&(
                                <span className="text-xl font-bold">Department</span> 
                        )}
                        {user.department&&(
                                <span className="font-bold">: {user.department}</span>
                        )}

                        {user.semester&&(
                                <span className="text-xl font-bold">Semester</span> 
                        )}
                        {user.semester&&(
                                <span className="font-bold">: {user.semester}</span>
                        )}

                        {user.ktuId&&(
                                <span className="text-xl font-bold">KTU Registration No</span> 
                        )}
                        {user.ktuId&&(
                                <span className="font-bold">: {user.ktuId}</span>
                        )}

                        {user.advisors&&(
                                <span className="text-xl font-bold">Staff Advisor</span> 
                        )}

                        {user.advisors&&(
                                <span className="font-bold">: {user.advisors.join(', ')}</span>
                        )}
                        </div>
                </section>
            </section>
        </div>
    )
}
