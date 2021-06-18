import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function AdvisorCard({name,email,semester,index}) {
    return (
        <div className="bg-white mx-1 px-3 py-3 rounded flex flex-col ring-2 shadow-xl ring-blue-500 w-full justify-between my-2">
           
           <h3 className="text-xl my-0.5">{name}</h3>
           <h4 className="text-md my-0.5">{email}</h4>
           <div className="h-8 mt-1 w-8 rounded-full flex items-center font-bold justify-center text-md text-blue-500 bg-indigo-100">
               <div>{semester}</div>
         </div>
           <div className="flex w-full justify-end">
            <Tooltip title="Delete account" style={{fontSize:30}}>
                <IconButton aria-label="delete" style={{padding:0.5,outline:'none'}}>
                    <DeleteIcon style={{fontSize:25}}className="text-blue-500"/>
                </IconButton>
           </Tooltip>
           </div>
        </div>
    )
}
export default AdvisorCard
