import React, { useState, useEffect } from "react";
import "./today_tasks.css";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableCell} from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getUserTasksActionCreator } from "../../../redux/task/action";
import { connect } from "react-redux";
import {
  Edit as EditIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper
  },
  tableHeader: {
    fontWeight: 700
  }
}));

function TodayTasks({ currentUser, tasks, setTasks }) {
  const history = useHistory();
  const [selectDate] = useState(moment().format("YYYY-MM-DD"));
  const classes = useStyles();
  const { id } = currentUser;

  useEffect(() => {
    console.log("Todays Use Task");
    
    setTasks(id);
  }, [id]);

  return (
    <div className={classes.root}>
      <div className="search_bar">
        <h2>Today's Tasks</h2>
      </div>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Note</TableCell>
                <TableCell className={classes.tableHeader}>
                  Start Time
                </TableCell>
                <TableCell className={classes.tableHeader}>End Time</TableCell>
                <TableCell className={classes.tableHeader}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {tasks
                .filter(
                  i => moment(i.reportedAt).format("YYYY-MM-DD") === selectDate
                )
                .map(work => (
                  <TableRow key={work._id}>
                    <TableCell component="th" scope="row">
                      {work.todayWork.note}
                    </TableCell>
                    <TableCell>{work.todayWork.startTime}</TableCell>
                    <TableCell>{work.todayWork.endTime}</TableCell>
                    <TableCell>
                      <EditIcon
                        onClick={() => {
                          history.push(`/edit_work/${work._id}`);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}

              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}


const mapStateToProps = state => ({
  tasks: state.task.tasks
});

const mapDispatchToProps = dispatch => {
  return {
    setTasks: user => dispatch(getUserTasksActionCreator(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayTasks);