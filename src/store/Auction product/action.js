import ActionTypes from "./actionTypes";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Auction = (
  Name,
  price,
  discription,
  selectedValue,
  imageUpload,
  id,
  Categary
) => {
  console.log("🚀 ~ file: action.js:23 ~ Categary", Categary);
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
            const docRef = await addDoc(collection(db, "auctionItems"), {
              Name: Name,
              price: price,
              discription: discription,
              type: selectedValue,
              file: url,
              userId: id,
              Categary: Categary,
              isBid: false,
              confirmBid: false,
              bidder: [],
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
  return  (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    try {
      const docRef =  collection(db, "auctionItems");
      onSnapshot(docRef, (querySnapshot) => {
        const auctionItem = [];
        querySnapshot.forEach((doc) => {
          auctionItem.push({ id: doc.id, product: doc.data() });
        });
        dispatch({
              type: ActionTypes.Auction_Get_SUCCESS,
              payload: [...auctionItem],
            });
      });
    } catch (e) {
      console.log(e, "Error In Api Call GetAuction");
        dispatch({
          type: ActionTypes.Auction_Get_FAIL,
        });
    }
    // try {
    //   const querySnapshot = await getDocs(collection(db, "auctionItems"));
    //   const temp = [];
    //   querySnapshot.forEach((doc) => {
    //     temp.push({ id: doc.id, product: doc.data() });
    //   });
    //   dispatch({
    //     type: ActionTypes.Auction_Get_SUCCESS,
    //     payload: [...temp],
    //   });
    // } catch (e) {
    //   console.log(e, "error");
    //   dispatch({
    //     type: ActionTypes.Auction_Get_FAIL,
    //   });
    // }
  };
};

export const deleteAuction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.delete_Auction_LOADING,
    });
    try {
      const docRef = await doc(db, "auctionItems", id);
      deleteDoc(docRef);
      console.log("deleteAuction");
      dispatch({
        type: ActionTypes.delete_Auction_SUCCESS,
      });
    } catch (e) {
      console.log(e, "Error In Api Call delete_Auction");
      dispatch({
        type: ActionTypes.delete_Auction_FAIL,
      });
    }
  };
};

export const createBid = (id, price, Name) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Bid_Create_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      const auctionDetail = await getDoc(docRef);
      console.log(auctionDetail.data(), "auctionDetail");
      await setDoc(
        docRef,
        {
          isBid: true,
          bidder: [
            ...auctionDetail.data().bidder,
            {
              bidderId: localStorage.getItem("User"),
              bidderName: Name,
              bidPrice: price,
            },
          ],
        },
        { merge: true }
      );
      dispatch({
        type: ActionTypes.Bid_Create_SUCCESS,
      });
    } catch (e) {
      console.log(e, "Error In Api Call Bid_Create");

      dispatch({
        type: ActionTypes.Bid_Create_FAIL,
      });
    }
  };
};

export const deleteBid = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Cancel_Bid_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      const auctionDetail = await getDoc(docRef);
      console.log(auctionDetail.data().bidder, "auctionDetail");
      const temp = [...auctionDetail.data().bidder];
      const updatedBidder = temp.filter(
        (bid) => bid.bidderId !== localStorage.getItem("User")
      );
      await updateDoc(docRef, {
        isBid: false,
        bidder: updatedBidder,
      });
      dispatch({
        type: ActionTypes.Cancel_Bid_SUCCESS,
      });
    } catch (e) {
      console.log(e, "Error In Api Call Cancel_Bid");

      dispatch({
        type: ActionTypes.Cancel_Bid_FAIL,
      });
    }
  };
};
