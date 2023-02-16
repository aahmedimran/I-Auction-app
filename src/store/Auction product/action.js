import ActionTypes from "./actionTypes";
import { collection, addDoc, getDocs,onSnapshot  } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Auction = (
  Name,
  price,
  discription,
  selectedValue,
  imageUpload
) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    const imageRef = ref(
      storage,
      `images/${imageUpload.name + new Date().getTime()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(ref(storage, `${snapshot.metadata.fullPath}`)).then(
        async (url) => {
          try {
            const docRef = await addDoc(collection(db, "auction items"), {
              Name: Name,
              price: price,
              discription: discription,
              type: selectedValue,
              file: url,
            });

            dispatch({
              type: ActionTypes.Auction_Create_SUCCESS,
              payload: docRef.id,
            });
            

            console.log("🚀 ~ docRef", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            dispatch({
              type: ActionTypes.Auction_Create_FAIL,
            });
          }
        }
      );
    });
  };
};

export const getAuction = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    try {



      
      const querySnapshot = await getDocs(collection(db, "auction items"));
      const temp = [];
      console.log(querySnapshot.data);
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, product: doc.data() });
      });
      // setdata([...temp])
      dispatch({
        type: ActionTypes.Auction_Get_SUCCESS,
        payload: [...temp],
      });
    } catch (e) {
      console.log(e, "error");
      dispatch({
        type: ActionTypes.Auction_Get_FAIL,
      });
    }
  };
};
