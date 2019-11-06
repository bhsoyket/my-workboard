import React from 'react'
import AddTask from "../../components/add_task";

function NewTask({currentUser}) {
    return (
        <div>
            <AddTask  currentUser={currentUser} />
        </div>
    )
}

export default NewTask
