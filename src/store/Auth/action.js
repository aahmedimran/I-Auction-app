import ActionTypes from "./actionTypes";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export const Userauth = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Login_User_LOADING,
    });
    signInWithEmailAndPassword(auth, email, password)
      .then( async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("User", user.uid);
        const docRef = doc(db, "users", user.uid);
        const auctionDetail = await getDoc(docRef);
        localStorage.setItem("Profile", auctionDetail.data().firstName);
        dispatch({
          type: ActionTypes.Login_User_SUCCESS,
          payload: user,
        });
        toast.success("Login Success");
      })
      .catch((error) => {
        toast.error("Email Or password Incorrect");
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
          type: ActionTypes.User_Create_SUCCESS,
        });
        try {
          // eslint-disable-next-line
          const docRef = await setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
          });
          toast.success("SignUp success");
        } catch (e) {
          console.error("Error adding document: ", e);
          toast.error("SignUp error");
        }
      })
      .catch((error) => {
        console.log("error api call", error);

        dispatch({
          type: ActionTypes.User_Create_FAIL,
        });
      });
  };
};


