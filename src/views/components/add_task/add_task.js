import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

function AddTask({ currentUser, currentTask, formHandler }) {
  const { workId } = useParams();
  // const [editWork] = useState(workId ? workId : "");
  const [values, setValues] = useState({
    note: "",
    inprogress: false,
    start_time: moment().format("hh:mm: a"),
    end_time: moment().format("hh:mm: a"),
    tomorrowWork: "",
    challenges: ""
  });

  const workData = {
    todayWork: {
      note: values.note,
      inProgress: values.inprogress,
      startTime: `${values.start_time}`,
      endTime: `${values.end_time}`
    },
    tomorrowWork: values.tomorrowWork,
    challenges: values.challenges
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    formHandler({ user: currentUser, ...workData });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    formHandler({ user: currentUser, ...workData });
  };

  useEffect(() => {
    if (currentTask) {
      setValues({
        note: currentTask.todayWork.note,
        inprogress: currentTask.todayWork.inProgress,
        start_time: currentTask.todayWork.startTime,
        end_time: currentTask.todayWork.endTime,
        tomorrowWork: currentTask.tomorrowWork,
        challenges: currentTask.challenges
      });
    }
  }, [currentTask]);

  return (
    <div className="add-task__container">
      {workId ? <h2>Edit Task</h2> : <h2>Create a new task</h2>}
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
          value={values.note}
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
              value={values.inprogress}
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
          value={values.tomorrowWork}
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
          value={values.challenges}
          onChange={e => {
            handleChange("challenges", e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="form-button"
          onClick={handleSubmit}
        >
          {workId ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
