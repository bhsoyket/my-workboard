import React from "react";
import axios from "axios";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import "./add_task.css";
import moment from "moment";

function AddTask() {
  const [values, setValues] = React.useState({
    note: "",
    inprogress: false,
    start_time: moment().format("hh:mm: a"),
    end_time: moment().format("hh:mm: a"),
    tomorrowWork: '',
    challenges: '',
    reportedAt: moment().format()
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios({
      method: 'POST',
      url: `/works`,
      baseURL: `http://192.168.1.5:7000`,
      data: values,
      headers: {'authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA'}
    })
    .then( (resData) => {
      console.log(resData.data);
      
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });
  };
  // console.log(values);
  return (
    <div className="add-task__container">
      <h2>Create a new task</h2>
      <form className="form__container" noValidate autoComplete="off">
        <TextField
          id="standard-textarea"
          label="Note"
          placeholder="Please Input Your Task Note"
          multiline
          className="form-item note-input"
          margin="normal"
          rows="3"
          variant="filled"
          onChange={e => {
            handleChange("note", e.target.value);
          }}
        />
        <FormControlLabel
          className="form-item checkbox"
          control={
            <Checkbox
              checked={values.inprogress}
              onChange={e => {
                handleChange("inprogress", e.target.checked);
              }}
              value="inprogress"
            />
          }
          label="In Progress"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Start Time"
            className="form-item"
            value={moment(values.start_time, "hh:mm a").toDate()}
            onChange={date => {
              handleChange("start_time", moment(date).format("hh:mm: a"));
            }}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="End Time"
            className="form-item"
            value={moment(values.end_time, "hh:mm a").toDate()}
            onChange={date => {
              handleChange("end_time", moment(date).format("hh:mm: a"));
            }}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="standard-textarea"
          label="Tomorrow Work"
          placeholder="Please Input Tomorrow Work"
          multiline
          className="form-item note-input"
          variant="filled"
          rows="2"
          onChange={e => {
            handleChange("tomorrowWork", e.target.value);
          }}
        />
        <TextField
          id="standard-textarea"
          label="Challenges"
          placeholder="Please Input Challenges"
          multiline
          className="form-item note-input"
          variant="filled"
          rows="2"
          onChange={e => {
            handleChange("challenges", e.target.value);
          }}
        />
        <Button variant="contained" color="primary"  className="form-button" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
