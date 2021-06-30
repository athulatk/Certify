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

export default function ApplicationModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
           <h2 className="text-xl font-bold">N Athul Kumar</h2>
           <h3 className="text-lg font-semibold">S6 CSE</h3>
           <div className="grid gap-2 w-1/2 grid-cols-2 mt-3 mb-3">
           <h4>Admission Number</h4><h4>: &emsp; 180287</h4>
           <h4>Email</h4><h4>: &emsp; athulnvinod@gmail.com</h4>
           <h4>University Id</h4><h4>: &emsp; TVE18CS042</h4>
           <h4>Requested For</h4><h4>: &emsp; Bonafide Certificate</h4>
           <h4>Applied Date</h4><h4>: &emsp; 30-04-2021</h4>
           </div>
           <h4 className="mb-2">Request Letter:</h4>
           <div className="grid gap-x-3 w-1/2 grid-cols-4">
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           </div>
           <h4 className="mt-3 mb-2">Other attachments:</h4>
           <div className="grid gap-x-3 gap-y-1 w-1/2 grid-cols-4">
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           <p className="border-2 rounded-md bg-white text-blue-500 cursor-pointer text-center"><AttachFileIcon style={{fontSize:18}}/> letter.pdf</p>
           </div>
           <h4 className="mt-3 mb-1">Description:</h4>
           <h4 className="mb-3">Very urgent lorem ipsum dolor sit amet asdlfkjasldfkjlasljlkj lkjlkj lkjlkj lkjlkj lkjlk kdjf</h4>
           <label>Remarks:</label><br/>
           <textarea cols="100" rows="3" className="border-2 outline-none p-2"/>
           <div className="w-full flex items-center justify-between mt-2">
           
            <Button variant="contained"
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'white',
                color:'#528CF8'}}>
            <ReplayIcon style={{fontSize:20,marginRight:'0.2em'}}/> Return</Button>
            <Button variant="contained"
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'#528CF8',
                color:'white'}}>
            <ThumbUpIcon style={{fontSize:18,marginRight:'0.2em'}}/> Approve </Button>
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}