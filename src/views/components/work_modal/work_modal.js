import React, {useState} from "react";
import WorkList from "../work_list";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from "moment";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function WorkModal({ open, handleClose, employee }) {
  const [ selectDate, setselectDate ] = useState(moment().format('YYYY-MM-DD'));
  const classes = useStyles();
  const handleChange = (value) => {
    setselectDate(value);
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Work List of {employee.name}
        </DialogTitle>
        <DialogContent dividers>
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
          <WorkList employee={employee} selectDate={selectDate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WorkModal;
