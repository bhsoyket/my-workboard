import React from "react";
import EmpCard from "../emp_card";
import { Grid } from "@material-ui/core";
import "./content.css";

function Content({ employees }) {
  console.log(employees);

  return (
    <div className="content__container">
      <Grid container spacing={3}>
        {employees.map(emp => (
          <EmpCard employee={emp} />
        ))}
      </Grid>
    </div>
  );
}

export default Content;
