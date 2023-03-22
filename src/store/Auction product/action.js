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

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";

export const Auction = (
  Name,
  price,
  discription,
  selectedValue,
  auctionTime,
  imageUpload,
  id,
  Categary
) => {
  return (dispatch) => {
    var date = new Date();
    // add a day
    date.setDate(date.getDate() + +auctionTime);
    //convert milisecond
    var milliseconds = date.getTime();
    console.log(milliseconds);

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
              auctionEndTime: milliseconds,
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
  return async (dispatch) => {
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
        const timeAvailable = auctionItem.filter(
          (data) => data.product.auctionEndTime !== null
        );
        const checkTime = timeAvailable.filter(
          (data) => new Date(data.product.auctionEndTime) < new Date()
        );
        if (checkTime.length > 0) {
          try {
            // debugger
            const productId = checkTime.map((data) => data.id);
            // console.log(userId[0]);
            const a = checkTime.map((data) => data.product.bidder);

            let maxObject = a[0].reduce((max, obj) =>
              obj.bidPrice > max.bidPrice ? obj : max
            );
            console.log(maxObject.bidderId);
            console.log(maxObject);
            const docRef = doc(db, "auctionItems", productId[0]);
            updateDoc(docRef, {
              auctionEndTime: null,
              isBid: false,
              bidder: [maxObject],
            });
            setDoc(
              docRef,
              {
                confirmBid: true,
                aceaptedBid: [
                  {
                    User: maxObject.bidderId,
                  },
                ],
              },
              { merge: true }
            );
          } catch (e) {
            console.log("error");
          }
        } else {
          console.log("data not found");
        }

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

export const deleteAuction = (id, file) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.delete_Auction_LOADING,
    });
    const path = decodeURIComponent(file.split("?")[0].split("/o/")[1]);
    const desertRef = ref(storage, path);
    try {
      const docRef = doc(db, "auctionItems", id);
      await deleteDoc(docRef);
      console.log("Delete Auction Success");
      toast.success("Auction Deleted");

      dispatch({
        type: ActionTypes.delete_Auction_SUCCESS,
      });
      deleteObject(desertRef)
        .then(() => {
          console.log("file Deleated");
        })
        .catch((error) => {
          console.log(error, "Uh-oh, an error occurred!");
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
      console.log(updatedBidder);
      await updateDoc(docRef, {
        auctionEndTime: null,
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
