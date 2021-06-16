import React from 'react'
import SearchIcon from '../assets/search.svg'
import Logo from '../assets/logo.svg'
function Navbar() {
    return (
        <nav className="w-full flex justify-between items-center pt-4 px-8">
                <img src={Logo} alt="" id="logo"/>

                <div className="flex space-x-2">
                    <img src={SearchIcon} alt=""/>

                    <div className="rounded-full text-center text-sm h-10 w-10 ring-blue ring-2 pt-3">
                        S4A
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
