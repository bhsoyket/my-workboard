import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { auth } from "../../../firebase/my-firebase";
import "./login.css";

function AddTask() {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    if (values) {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .catch(error => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="add-task__container">
      <h1>Login</h1>
      <form className="form__container" noValidate autoComplete="off">
        <TextField
          id="email"
          name="email"
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
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Please Input Password"
          className="form-item note-input"
          variant="filled"
          onChange={e => {
            handleChange("password", e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="form-button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
      Or
      <h3>
        <Link className="link" to="/register">
          Register Now!
        </Link>
      </h3>
    </div>
  );
}

export default AddTask;
