import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Close from '../../assets/close.svg'
import axios from 'axios'
import {baseUrl} from '../../baseUrl'

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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} style={{width:'50px',outline:'none'}}>
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

export default function HodModal({details,setDetails,setHods}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) =>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    // setHods(prev=>[...prev,details])
    axios.post(`${baseUrl}/admin/hod/register`,{
      department:details.department,
      email:details.email,
      password:details.password
    })
    .then((res)=>{
      setHods(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    setDetails({department:"AEI",email:"",password:""})
    handleClose();

  }

  return (
    <div>
      <Button variant="contained"
      onClick={handleClickOpen}
            style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'#528CF8',
                color:'white',
                marginRight:'0.9em'}}>
            <AddIcon style={{fontSize:20}}/> Add HOD
        </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle style={{backgroundColor:'#ECEFF4',textAlign:'center'}} id="customized-dialog-title" onClose={handleClose}>
          Add HOD
        </DialogTitle>
        <DialogContent style={{backgroundColor:'#ECEFF4'}}>
            <form onSubmit={submitHandler}>
                <div className="mt-5">
                <label>Department<span className="text-blue-500 pl-30">*</span></label>
                <select name="department" className="ml-3 p-1 rounded-md border-blue-500 outline-none"  required onChange={handleChange}>
                    <option value="AEI">Applied Electronics and Instrumentation</option>
                    <option value="AR">Architecture</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="CSE">Computer Science and Engineering</option>
                    <option value="EEE">Electrical and Electronics Engineering</option>
                    <option value="ECE">Electronics and Communication Engineering</option>
                    <option value="IE">Industrial Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                </select>
                </div>
                <br />
                <label>Email<span className="text-blue-500 pl-30">*</span></label><br/>
                <input name="email"  className="border-blue-500" type="email" size="60" required onChange={handleChange}/><br />
                <div className="mt-4">
                <label>Password<span className="text-blue-500 pl-30">*</span></label><br/>
                </div>
                <input name="password"  className="border-blue-500" type="password" size="60" required onChange={handleChange}/><br />
                <div className="flex w-full items-center justify-center">
                <Button type="submit" style={{
                textTransform:'capitalize',
                outline:'none',
                backgroundColor:'#528CF8',
                color:'white',
                marginTop:'0.9em'}}><AddIcon style={{fontSize:17}}/> Add account</Button>
                </div>
            </form>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}