import React, { useState, useEffect } from "react";
import axios from "axios";
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

function WorkList({ employee, selectDate }) {
  
  const classes = useStyles();
  const [ worksState, setWorksState ] = useState([]);

  useEffect(() => {
    const works = async (userId) => {
      await axios({
        method: "GET",
        url: `/works/users/${userId}`,
        baseURL: `http://192.168.1.9:7000`,
        headers: {
          authorization:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
        }
      }).then(resData => {
        console.log("on Reponse",resData.data.data);
        setWorksState(resData.data.data);
      });
    };
    works(employee.id);
  }, [employee.id]);


  return (
    <div className={classes.root}>
      <List>
        {worksState.map((work, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${work.todayWork.note}`} secondary={`${work.todayWork.startTime} - ${work.todayWork.endTime}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default WorkList;
