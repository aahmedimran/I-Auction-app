import ActionTypes from "./actionTypes";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";

export const Userauth = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Login_User_LOADING,
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("🚀 ~ file: action.js:16 ~ .then ~ user", user);
        localStorage.setItem("User", user.uid);
        dispatch({
          type: ActionTypes.Login_User_SUCCESS,
          payload: user,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: ActionTypes.Login_User_FAIL,
        });
      });
  };
};
export const Usercreate = (firstName, lastName, email, password) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.User_Create_LOADING,
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed Up
        const user = userCredential.user;
        console.log("🚀 ~ file: index.jsx:58 ~ .then ~ user", user.uid);
        dispatch({
          type: ActionTypes.Login_User_SUCCESS,
        });
        try {
          const docRef = await setDoc(doc(db, "users", user.uid), {// eslint-disable-line
            firstName: firstName,
            lastName: lastName,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        console.log("error api call", error);

        dispatch({
          type: ActionTypes.Login_User_FAIL,
        });
      });
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Get_User_LOADING,
    });
    try {
      const docRef = doc(db, "users", id);
      const auctionDetail = await getDoc(docRef);
      dispatch({
        type: ActionTypes.Get_User_SUCCESS,
        payload:auctionDetail.data()
      });
    } catch {
      console.log("e");
      dispatch({
        type: ActionTypes.Get_User_FAIL,
      });
    }
  };
};
