import React from 'react'
import ApNavbar from './ApNavbar'
import PrincipalCard from './PrincipalCard'
import DeanCard from './DeanCard'
import HodCard from './HodCard'
import {Button} from '@material-ui/core'


function Adminpanel() {
    return (


            <div className="flex flex-col text-black w-full items-center space-y-8">
                <ApNavbar/>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex flex-row w-full justify-around p-5">

                    <PrincipalCard/>
                    <DeanCard />

                </div>
                <div className="underline ">List of Head of the department(HOD)</div>
                <div className="w-full flex flex-row-reverse mr-10"> <Button  style={{textTransform:'capitalize',backgroundColor:'#4a86f7',color:'white',border:'none',margin:'5px'}}>Add HOD </Button>
</div>
                <div className="w-full px-5 ">
                    <HodCard/>
                    <HodCard/>
                    <HodCard/>
                    <HodCard/>
                </div>
                <div></div>
            </div>
            

    )
}

export default Adminpanel
