import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function PrincipalCard({name,email,semester,index}) {
    return (
        <div className=" bg-white mx-1 px-3 py-3 flex justify-between mb-3  rounded  ring-2 shadow-xl ring-blue-500  my-2">
                <div className="text-sm my-1 whitespace-nowrap px-5">Hod-cse</div>
                {/* <h4 className="text-md my-0.5">{email}</h4> */}
                <div className="text-md my-0.5 px-5">hod.cse@cet.ac.in</div>
                <div class="rounded-full w-10 h-7   bg-indigo-100 text-blue-500 font-bold justify-center	flex items-center">CSE</div>
                {/* <div className="w-8 rounded-full flex items-center font-bold  text-md text-blue-500 bg-indigo-100">
                    <div>cse</div>

            </div> */}
           <div className="">
           <Tooltip title="Delete account" style={{fontSize:30}}>
                <IconButton aria-label="delete" style={{padding:0.5,outline:'none',paddingRight:10}}>
                    <EditIcon style={{fontSize:25}}className="text-blue-500"/>
                </IconButton>
           </Tooltip>
            <Tooltip title="Delete account" style={{fontSize:30}}>
                <IconButton aria-label="delete" style={{padding:0.5,outline:'none'}}>
                    <DeleteIcon style={{fontSize:25}}className="text-blue-500"/>
                </IconButton>
           </Tooltip>
           </div>
        </div>
    )
}
export default PrincipalCard
