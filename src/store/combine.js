import { combineReducers } from "redux";
import {Login,Signup} from './Auth/reducer'
import {addAuction,getAuction,deleteAuction,updateAuction,createBid,cancelBid,aceaptBid} from'./Auction product/reducer'
import {changeTheMode} from'./app-mode/reducer'

const rootReducer = combineReducers({
  Login,
  Signup,
  addAuction,
  getAuction,
  updateAuction,
  createBid,
  deleteAuction,
  cancelBid,
  aceaptBid,
  changeTheMode
});
export default rootReducer;
