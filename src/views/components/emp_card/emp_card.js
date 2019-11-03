import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    width: "400px",
    height: "120px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "60%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "100%",
    flexBasis: "40%"
  }
}));

function EmpCard({ employee, history }) {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Card className={classes.card} onClick={() => {history.push(`/emp_details/${employee.id}`)}}>
        <CardMedia
          className={classes.cover}
          image="https://picsum.photos/200/300"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {employee.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {employee.designation}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

export default withRouter(EmpCard);
