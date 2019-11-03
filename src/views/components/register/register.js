import React, {useState} from "react";
import { TextField, Button } from "@material-ui/core";
import "./register.css";

function AddTask({handleRegister}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    designation: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (values.password === values.confirm_password) {
      handleRegister(values);
    }
  };

  return (
    <div className="add-task__container">
      <h1>Register</h1>
      <form className="form__container" noValidate autoComplete="off">
        <TextField
          id="name"
          name="name"
          label="Name"
          placeholder="Please Input Your Name"
          className="form-item note-input"
          margin="normal"
          variant="filled"
          onChange={e => {
            handleChange("name", e.target.value);
          }}
        />
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
          id="designation"
          name="designation"
          label="Designation"
          placeholder="Please Input Your Designation"
          className="form-item note-input"
          margin="normal"
          variant="filled"
          onChange={e => {
            handleChange("designation", e.target.value);
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
        <TextField
          id="confirm_password"
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="Please Confirm Password"
          className="form-item note-input"
          variant="filled"
          onChange={e => {
            handleChange("confirm_password", e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="form-button"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
