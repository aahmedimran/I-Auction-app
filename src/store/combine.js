import { combineReducers } from "redux";
import {Login,Signup} from './Auth/reducer'
import {addAuction,getAuction} from'./Auction product/reducer'
const rootReducer = combineReducers({
  Login,
  Signup,
  addAuction,
  getAuction
});
export default rootReducer;
