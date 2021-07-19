import React from 'react'
import SearchIcon from '../assets/search.svg'
import Logo from '../assets/logo.svg'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Profile from '../assets/profile.jpg';
import { connect } from 'react-redux';

const Mymenu = withStyles({
    paper: {

        marginTop: '50px',
        marginRight:'50px',
        paddingLeft:'2px',
        border:'2px solid #528CF8',
        borderRadius:'10px'
      },
    list:{
        width:'100%'
    }
  })(Menu);

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:hover': {
        backgroundColor:'#528CF8',
        color:'white'
      }
    },
  }))(MenuItem);


function Navbar(props) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history=useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="w-full">
        <nav className="w-full flex justify-between items-center pt-4 px-8">
                <img src={Logo} alt="" id="logo"/>
                <div className="flex space-x-8 mr-5">
                    <img src={SearchIcon} alt=""/>
                    <img src={Profile} alt="" className="rounded-full w-10 ring-blue ring-2 cursor-pointer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                    {/* <div className="rounded-full cursor-pointer bg-white text-center text-sm h-10 w-10 ring-blue ring-2 pt-3" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                      <img src={Profile} alt=""/>
                    </div> */}

                    <Mymenu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                     >
                        {props.loggedIn==="student"&&(<StyledMenuItem 
                          onClick={()=>{
                            handleClose()
                            props.setModalActive(true)
                          }}>View Profile</StyledMenuItem>)}
                          <StyledMenuItem onClick = {()=>{
                            handleClose()
                            props.setPswd(true)
                          }}
                          >Change Password</StyledMenuItem>
                        <StyledMenuItem onClick={handleClose} onClick={()=>history.push('/')}>Logout</StyledMenuItem>
                    </Mymenu>

                    {/* {showMenu &&
                    <div className="rounded-md absolute right-0 mt-2 z-10 cursor-pointer bg-white text-left text-sm ring-blue ring-2 pl-2 pr-8 py-3">
                        <div className="mb-3 ml-0">View Profile</div>
                        <div>Logout</div>
                    </div>} */}
                    </div>
            </nav>
            
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
