import { combineReducers } from "redux";
import {Login,Signup,Getuser} from './Auth/reducer'
import {addAuction,getAuction,deleteAuction,createBid} from'./Auction product/reducer'

const rootReducer = combineReducers({
  Login,
  Signup,
  Getuser,
  addAuction,
  getAuction,
  createBid,
  deleteAuction
 
});
export default rootReducer;
