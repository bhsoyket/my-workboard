import React, {useEffect} from 'react'
import AddTask from "../../components/add_task";
import { updateTaskActionCreator, getTaskActionCreator } from "../../../redux/task/action";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function EditTask({currentUser, task, getTask, setTask}) {
    const history = useHistory();
    const { workId } = useParams();
    const handleUpdate = workData => {         
        setTask({id: workId, ...workData})
        .then(() => {
            history.push(`/today_task`)}
        )
    };
    useEffect(() => {
        getTask(workId);
    }, [getTask, workId])

    return (
        <div>
            <AddTask currentTask={task} currentUser={currentUser} formHandler={handleUpdate} />
        </div>
    )
}


const mapStateToProps = state => ({
    task: state.task.current_task
});
  
const mapDispatchToProps = dispatch => {
    return {
        getTask: workId => dispatch(getTaskActionCreator(workId)),
        setTask: task => dispatch(updateTaskActionCreator(task))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
