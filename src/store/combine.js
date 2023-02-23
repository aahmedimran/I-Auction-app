import { combineReducers } from "redux";
import {Login,Signup} from './Auth/reducer'
import {addAuction,getAuction,deleteAuction,updateAuction,createBid,cancelBid,aceaptBid} from'./Auction product/reducer'

const rootReducer = combineReducers({
  Login,
  Signup,
  addAuction,
  getAuction,
  updateAuction,
  createBid,
  deleteAuction,
  cancelBid,
  aceaptBid
});
export default rootReducer;
