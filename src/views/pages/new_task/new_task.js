import React from 'react'
import AddTask from "../../components/add_task";
import { createTaskActionCreator } from "../../../redux/task/action";
import { connect } from "react-redux";

function NewTask({currentUser, task, setTask}) {
    const handleSubmit = workData => {         
        setTask(workData);
    };

    return (
        <div>
            <AddTask  currentUser={currentUser} formHandler={handleSubmit} />
        </div>
    )
}

const mapStateToProps = state => ({
    task: state.task.current_task
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      setTask: task => dispatch(createTaskActionCreator(task))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
