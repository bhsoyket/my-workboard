import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import employeeReducer from "./employee/reducer";
import taskReducer from "./task/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  task: taskReducer
});

export default rootReducer;
