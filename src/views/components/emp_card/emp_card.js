import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    width: "400px"
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

function EmpCard({employee, handleClickOpen}) {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Card className={classes.card} onClick={(e)=>{
        handleClickOpen(employee.user.id)
      }} >
        <CardMedia
          className={classes.cover}
          image="https://picsum.photos/200/300"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {employee.user.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {employee.user.designation}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

export default EmpCard;
