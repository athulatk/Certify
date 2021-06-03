import React from 'react'
import {Button} from '@material-ui/core'

function MyButton(props) {
    return (
        <Button variant="contained" color="primary" style={{textTransform:'capitalize',backgroundColor:props.backcolor,color:props.color}}>
        Helo
        </Button>
    )
}

export default MyButton
