import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function PrincipalCard({name,email,department,index}) {
    return (
        <div className=" bg-white mx-1 grid grid-cols-4 px-3 py-3 justify-between mb-3  rounded  ring-2 shadow-xl ring-blue-500  my-2">
                <div className="text-sm my-1 whitespace-nowrap px-5">HOD-{department}</div>
                <div className="text-md my-0.5 px-5">{email}</div>
                <div className="w-full flex justify-center">
                <div class="rounded-full w-10 h-7 bg-indigo-100 text-blue-500 font-bold justify-center	flex items-center">{department}</div>
                </div>
           <div className="flex justify-end">
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
