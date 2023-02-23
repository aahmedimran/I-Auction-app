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
import { toast } from "react-toastify";

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
              aceaptedBid: [],
            });
            toast.success("Auction Added");
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
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    try {
      const docRef = collection(db, "auctionItems");
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

export const updateAuction = (id, Name, price, description, type) => {
  console.log(
    "🚀 ~ file: action.js:113 ~ updateAuction ~ id,Name,price,description,tyoe:",
    id,
    Name,
    price,
    description,
    type
  );
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Bid_Create_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      await updateDoc(docRef, {
        Name,
        price,
        description,
        type,
      });
      toast.success("Auction Updated");
      dispatch({
        type: ActionTypes.Bid_Create_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.Bid_Create_FAIL,
      });
    }
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
      console.log("Delete Auction Success");
      toast.success("Auction Deleted");

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

export const createBid = (id, price) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Bid_Create_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      const auctionDetail = await getDoc(docRef);
      await setDoc(
        docRef,
        {
          isBid: true,
          bidder: [
            ...auctionDetail.data().bidder,
            {
              bidderId: localStorage.getItem("User"),
              bidderName: localStorage.getItem("Profile"),
              bidPrice: price,
            },
          ],
        },
        { merge: true }
      );
      toast.success("Bid Created");
      dispatch({
        type: ActionTypes.Bid_Create_SUCCESS,
      });
    } catch (e) {
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
      const temp = [...auctionDetail.data().bidder];
      const updatedBidder = temp.filter(
        (bid) => bid.bidderId !== localStorage.getItem("User")
      );
      await updateDoc(docRef, {
        bidder: updatedBidder,
      });
      toast.success("Bid Canceled");
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

export const aceaptBid = (productId, UserId) => {
  console.log(
    "🚀 ~ file: action.js:233 ~ aceaptBid ~ productId, UserId:",
    productId,
    UserId
  );
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Aceapt_Bid_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", productId);
      const auctionDetail = await getDoc(docRef);
      const updatedBidder = auctionDetail
        .data()
        .bidder.filter((bid) => bid.bidderId === UserId);
      await updateDoc(docRef, {
        isBid: false,
        bidder: updatedBidder,
      });
      await setDoc(
        docRef,
        {
          confirmBid: true,
          aceaptedBid: [
            {
              User: UserId,
            },
          ],
        },
        { merge: true }
      );
      dispatch({
        type: ActionTypes.Aceapt_Bid_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.Aceapt_Bid_FAIL,
      });
    }
  };
};
