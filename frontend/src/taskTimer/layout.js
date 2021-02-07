import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './login';
import {Link} from 'react-router-dom'
import { registerUser,clearRgister } from "../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Layout(props) {
  const classes = useStyles();
  const {login,clearRgister,user}= props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Task Timer
          </Typography>
           <Typography>
             {login ? user.email:""}
           </Typography>
          <Link to="/login" style={{ textDecoration: "none",color:'white' }}>
          <Button color="inherit" onClick={clearRgister}>{login?"Logout":"Login"}</Button>
          </Link>
 
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    errorMessage: state.errorMessage,
    login:state.login
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      registerUser,
      clearRgister,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(Layout);
