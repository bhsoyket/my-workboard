import {
  CREATE_TASK,
  GET_USER_TASKS,
  UPDATE_TASK,
  ALL_TASK,
  GET_TASK
} from "./action-types";

const getInitialState = () => ({
  tasks: [],
  all_tasks: [],
  current_task: null
});

const taskReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload]
      };
    case GET_USER_TASKS:
      return {
        ...state,
        tasks: [...payload]
      };
    case GET_TASK:
      return {
        ...state,
        current_task: payload
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === payload.id) {
            return {
              ...task,
              ...payload
            };
          }
          return task;
        })
      };
    case ALL_TASK:
      return {
        ...state,
        all_tasks: payload
      };
    default:
      return state;
  }
};

export default taskReducer;
