import {
  SET_CURRENT_USER,
  GET_ALL_USER,
  SET_LOADING,
  GET_USER
} from "./action-types";

const getInitialState = () => ({
  isLoading: false,
  currentUser: null,
  selectedUser: {},
  users: [],
  userLoaded: false
});

const userReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        userLoaded: true
      };
    case GET_USER:
      return {
        ...state,
        selectedUser: payload
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: [...payload]
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    default:
      return state;
  }
};

export default userReducer;
