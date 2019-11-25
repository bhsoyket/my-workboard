import {
  SET_CURRENT_USER,
  GET_ALL_USER,
  SET_LOADING,
  GET_USER
} from "./action-types";
import {
  auth,
  firestore,
  convertCollectionSnapshotToMap,
  createUserDocument
} from "../../firebase/my-firebase";

export const setCurrentUserActionCreator = user => {
  return { type: SET_CURRENT_USER, payload: user };
};

export const getAllUserActionCreator = () => {
  return dispatch => {
    dispatch({ type: SET_LOADING, payload: true });
    firestore
      .collection("users")
      .get()
      .then(snapshot => {
        const collectionMap = convertCollectionSnapshotToMap(snapshot);
        dispatch({ type: GET_ALL_USER, payload: collectionMap });
        dispatch({ type: SET_LOADING, payload: false });
      })
      .catch(error => {
        console.error("Error getting data from firebase:", error.message);
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};

export const getUserActionCreator = id => {
  return dispatch => {
    dispatch({ type: SET_LOADING, payload: true });
    firestore
      .collection("users")
      .doc(id)
      .get()
      .then(snapshot => {
        const userCollection = { id: snapshot.id, ...snapshot.data() };
        console.log(userCollection);
        dispatch({ type: GET_USER, payload: userCollection });
        dispatch({ type: SET_LOADING, payload: false });
      })
      .catch(error => {
        console.error("Error getting data from firebase:", error.message);
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};

export const registerUserActionCreator = givenUser => {
  return dispatch => {
    return auth
      .createUserWithEmailAndPassword(givenUser.email, givenUser.password)
      .then(async authUser => {
        const { password, confirm, code, ...user } = givenUser;
        const userRef = await createUserDocument(authUser, user);
        userRef.onSnapshot(snapShot => {
          const loggedInUser = {
            id: snapShot.id,
            ...snapShot.data()
          };
          dispatch({ type: SET_CURRENT_USER, payload: loggedInUser });
        });
      })
      .catch(error => {
        console.error("Error creating user:", error.message);
      });
  };
};
