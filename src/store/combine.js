import { combineReducers } from "redux";
import {Login,Signup} from './Auth/reducer'
import {addAuction,getAuction,deleteAuction,createBid} from'./Auction product/reducer'

const rootReducer = combineReducers({
  Login,
  Signup,
  addAuction,
  getAuction,
  createBid,
  deleteAuction
 
});
export default rootReducer;
