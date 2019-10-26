import React from "react";
import axios from "axios";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import "./login.css";
import moment from "moment";

function AddTask() {
  const [values, setValues] = React.useState({
    phone: "",
    password: ""
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };
  // console.log(values);
  return (
    <div className="add-task__container">
      <h1>Login</h1>
      <form className="form__container" noValidate autoComplete="off">
        <TextField
          id="standard-textarea"
          label="Email"
          placeholder="Please Input Your Email"
          className="form-item note-input"
          margin="normal"
          variant="filled"
          onChange={e => {
            handleChange("email", e.target.value);
          }}
        />
        <TextField
          id="standard-textarea"
          label="Password"
          type='password'
          placeholder="Please Input Password"
          className="form-item note-input"
          variant="filled"
          onChange={e => {
            handleChange("password", e.target.value);
          }}
        />
        <Button variant="contained" color="primary"  className="form-button" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
