import React from 'react'

export default function Sidebar({active}) {
    return (
        <div className={"transition duration-500 ease-in-out "}>
            <section className="w-full justify-center items-center">
                <div>User</div>
            </section>

            <section className="w-full justify-center items-center">
                <div>Name</div>
            </section>

            <section className="w-full justify-center items-center">
                <div>department</div>
            </section>

            <section className="w-full justify-center items-center">
                <div>semester</div>
            </section>

            <section className="w-full justify-center items-center">
                <button>Change Password</button>
            </section>
        </div>
    )
}
