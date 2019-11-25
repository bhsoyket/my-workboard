import React, {useEffect} from "react";
import EmpCard from "../emp_card";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllUserActionCreator } from "../../../redux/employee/action";
import "./content.css";

function Content({ employees, setEmployees }) {
  useEffect(() => {
    setEmployees();
    
  }, [setEmployees])
  return (
    <div className="content__container">
      <Grid container spacing={3}>
        {employees.map(emp => (
          <EmpCard key={emp.id} employee={emp} />
        ))}
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  employees: state.employee.all_employee
});

const mapDispatchToProps = dispatch => {
  return {
    setEmployees: () => dispatch(getAllUserActionCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
