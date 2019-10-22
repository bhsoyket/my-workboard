import React from "react";
import EmpCard from "../emp_card";
import WorkModal from "../work_modal";
import { Grid } from "@material-ui/core";
import "./content.css";

function Content({ employees }) {
  const [open, setOpen] = React.useState(false);
  const [selectEmp, setSelectEmp] = React.useState({});

  const handleClickOpen = (id) => {
    setSelectEmp(employees.find(emp => emp.user.id === id))
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="content__container">
      <Grid container spacing={3}>
        {employees.map(emp => (
          <EmpCard key={emp.user.id} employee={emp} handleClickOpen={handleClickOpen} />
        ))}
      </Grid>
      <WorkModal open={open} handleClose={handleClose} employee={selectEmp} />
    </div>
  );
}

export default Content;
