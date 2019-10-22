import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, List, ListItemText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minWidth: 400,
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function WorkList({ employee }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        {employee.works.map((work, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Work ${index + 1}`} secondary={work} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default WorkList;
