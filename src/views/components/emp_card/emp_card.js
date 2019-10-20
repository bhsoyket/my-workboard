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

function EmpCard() {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Belayet Hossain
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Software Developer
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image="https://picsum.photos/200/300"
          title="Live from space album cover"
        />
      </Card>
    </Grid>
  );
}

export default EmpCard;
