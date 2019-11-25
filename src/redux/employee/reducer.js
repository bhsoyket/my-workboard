import { GET_ALL_EMPLOYEE } from "./action-types";

const getInitialState = () => ({
  all_employee: []
});

const employeeReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case GET_ALL_EMPLOYEE:
      return {
        ...state,
        all_employee: [...payload]
      };
    default:
      return state;
  }
};

export default employeeReducer;
