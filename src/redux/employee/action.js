import { GET_ALL_EMPLOYEE } from "./action-types";
import { firestore } from "../../firebase/my-firebase";

export const getAllUserActionCreator = () => {
  return dispatch => {
    return firestore
      .collection("users")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
      .then(users => {
        dispatch({ type: GET_ALL_EMPLOYEE, payload: users });
      })
      .catch(error => {
        console.error("Error adding document: ", error.message);
      });
  };
};
