import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Close from '../assets/close.svg'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplayIcon from '@material-ui/icons/Replay';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'
import {baseUrl} from '../baseUrl'
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    outline:'none'
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} style={{width:'80px',outline:'none'}}>
          <img alt="close" src={Close} style={{outline:'none'}}/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ApplicationModal(props) {
  const [open, setOpen] = React.useState(false);
  const [select,setSelect]=React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReturn = ()=>{
    if(select){
      console.log("helo");
      setOpen(false);
    }
    else
      alert("Please select 'Forward to'")
  }

  const handleForward = ()=>{
    // if(select){
    console.log(props.data.application)
    axios.get(`${baseUrl}/advisor/approve?_id=${props.data.application._id}`)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
          console.error(err)
    })
    console.log("helo");
    setOpen(false);
    // }
    // else
    //   alert("Please select 'Forward to'")
    
  }

  const handleSelect = (e)=>{
    setSelect(e.target.value);
  }

  // const loggedIn=props.state.loggedIn
  console.log(props.loggedIn)

  return (
    <div>
      <Button variant="contained"
      onClick={handleClickOpen}
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'#528CF8',
                color:'white'}}>
            View </Button>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
        <DialogTitle style={{textAlign:'center'}} id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent style={{}}>
          <div style={{marginLeft:'1em',marginRight:'1em'}}>
           <h2 className="text-xl font-bold">{props.data.student.name}</h2>
           <h3 className="text-lg font-semibold">{props.data.student.semester} {props.data.student.department}</h3>
           <div className="grid gap-2 w-1/2 grid-cols-2 mt-3 mb-3">
           <h4>Admission No</h4><h4>: &emsp; {props.data.student.admissionNo}</h4>
           <h4>Email</h4><h4>: &emsp; {props.data.student.email}</h4>
           <h4>University Id</h4><h4>: &emsp; {props.data.student.ktuId}</h4>
           <h4>Requested For</h4><h4>: &emsp; {props.data.application.category}</h4>
           <h4>Applied Date</h4><h4>: &emsp; {props.data.application.date.slice(0,10)}</h4>
           </div>
           <h3 className="mb-2 mt-5 text-lg font-bold">Request Letter</h3>
           {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia architecto, voluptas corporis dolorum quaerat aliquam assumenda omnis, alias repellat cupiditate mollitia nesciunt quibusdam beatae velit nihil in exercitationem nemo illum. Eum eligendi, aut cum cupiditate consequuntur ex fugiat suscipit repudiandae harum facere deserunt magni obcaecati neque explicabo, soluta ea illum laudantium nostrum sequi architecto vitae. Laudantium, aliquam, reprehenderit beatae praesentium voluptate, blanditiis iure porro ullam error repellendus odio hic sed molestias sint aliquid voluptatum fugit suscipit earum dolorum itaque debitis. Iste, eius. Delectus atque cumque dicta, voluptates officiis pariatur esse beatae provident, voluptatem eos porro molestiae? Facere temporibus quaerat aperiam? */}
           <div dangerouslySetInnerHTML={{__html:props.data.application.letter.replace(/\n/g, "<br />")}}/>
           <h4 className="mt-3 mb-2 text-lg font-bold">Attachments</h4>
           <div className="grid gap-x-3 gap-y-1 w-1/2 grid-cols-4">
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           </div>
           {/* <h4 className="mt-5 mb-2 text-lg font-bold">Description</h4>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus deserunt omnis in animi facilis accusamus alias minima hic corrupti deleniti amet accusantium numquam nostrum repellendus nemo recusandae nam possimus architecto, molestias officiis repellat doloribus? Quae vitae debitis sit earum provident? Expedita commodi rem ad quisquam perspiciatis harum ipsam facilis suscipit! */}
           <div className="mt-5">
           <label htmlFor="remarks" className="text-lg font-bold">Remarks</label><br/>
           <textarea name="remarks" cols="100" rows="2" className="border-2 outline-none p-2"/>
           </div>
           <div className="mt-5 flex items-center justify-between">
             <div>
           
           {props.loggedIn==="hod"&&(
             <div>
                <span className="font-semibold">Forward to:</span>
                  <select name="forwardto" id="forwardselect" className="outline-none ml-2" onChange={handleSelect}>
                    <option value="">Select</option>
                    <option value="Principal">Principal</option>
                    <option value="Dean">Dean</option>
                  </select>
            </div>
            )}
           
           </div>

           <div className="flex items-center justify-end mt-2">
           
            <Button variant="contained"
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'white',
                color:'#528CF8'}}  onClick={handleReturn}>
            <ReplayIcon style={{fontSize:20,marginRight:'0.2em'}}/> Return/Reject</Button>
            <Button variant="contained"
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'#528CF8',
                color:'white',
                marginLeft:'5em'}}  onClick={handleForward}>
            <ThumbUpIcon style={{fontSize:18,marginRight:'0.2em'}}/> Approve and Forward </Button>
            </div>

            </div>
           

          </div>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

//redux
const mapStateToProps = state =>{
  return {
      user:state.user,
      loggedIn:state.loggedIn
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationModal);