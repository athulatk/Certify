import React from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CancelIcon from '@material-ui/icons/Cancel';
function Attachment({filename,files,file,setFiles}) {
    const handleRemove = ()=>{
        setFiles(files.filter(app=>app.name!==file.name))
    }
    return (
        <div className="border-2 rounded-xl bg-white text-blue-500">
            <div className="w-full flex justify-end">
                <CancelIcon onClick={handleRemove} className="cursor-pointer"/>
            </div>
        <p className="text-center px-4 pb-3">
        <AttachFileIcon style={{fontSize:18}}/> {filename}</p>
        </div>
    )
}

export default Attachment;
