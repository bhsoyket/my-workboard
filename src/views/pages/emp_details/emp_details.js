import React, { useState, useEffect } from "react";
import axios from "axios";
import "./emp_details.css";
import { useParams, useHistory } from "react-router-dom";
import {
  Table,
  TextField,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import moment from "moment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { getUserTasksActionCreator } from "../../../redux/task/action";
import { connect } from "react-redux";
import {
  LastPage as LastPageIcon,
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
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
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

function EmpDetails({ tasks, setTasks }) {
  const history = useHistory();
  const [selectDate, setselectDate] = useState(moment().format("YYYY-MM-DD"));
  const classes = useStyles();
  const handleChange = value => {
    setselectDate(value);
  };
  const { id } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
  setTasks(id);
  }, [id]);

  return (
    <div className={classes.root}>
      <div className="search_bar">
        <h2>Work List</h2>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Search by date"
            type="date"
            value={selectDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => {
              handleChange(e.target.value);
            }}
          />
        </form>
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={
                    tasks.filter(
                      i =>
                        moment(i.reportedAt).format("YYYY-MM-DD") === selectDate
                    ).length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
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
)(EmpDetails);