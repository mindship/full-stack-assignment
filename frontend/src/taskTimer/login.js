import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import { registerUser, clearRgister, loginAction } from "../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    // width:'500px',
    maxWidth: "500px",
    minWidth: "300px",
    margin: "64px auto",
  },
  input: {
    // width:'500px',
    maxWidth: "500px",
    minWidth: "300px",
    margin: "8px",
  },
  password: {
    display: "flex",
    flexDirection: "row",
  },
  menuButton: {
    marginBottom: "16px",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Login(props) {
  const classes = useStyles();
  const [data, setData] = useState({ email: "", password: "" });
  const history = useHistory();
  const { login, loginAction, errorMessage } = props;
  const emailHandler = (event) => {
    setData({ ...data, email: event.target.value });
  };
  const passwordHandler = (event) => {
    setData({ ...data, password: event.target.value });
  };
  useEffect(() => {
    if (login) {
      history.push("/main");
    }
  });
  return (
    <div className={classes.root}>
      {errorMessage && (
        <Alert severity="error">Something went wrong — check it out!</Alert>
      )}
      <h3>Login User</h3>
      <TextField
        className={classes.input}
        id="outlined-disabled"
        label="Email"
        variant="outlined"
        value={data.email}
        onChange={(event) => {
          emailHandler(event);
        }}
      />
      <div className={classes.password}>
        <TextField
          className={classes.input}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={data.password}
          onChange={(event) => {
            passwordHandler(event);
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={() => {
          loginAction(data);
        }}
        className={classes.menuButton}
      >
        Login
      </Button>
      <Link to="/">Not Registered</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errorMessage: state.errorMessage,
    login: state.login,
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      registerUser,
      clearRgister,
      loginAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(Login);
