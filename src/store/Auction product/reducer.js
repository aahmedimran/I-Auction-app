import ActionTypes from './actionTypes'
const INTIALSTATE = {
  addAuctiondata: [],
  getAuction:[],
  bidCreate:[]
};


export  const addAuction = (state=INTIALSTATE,action)=>{
    switch (action.type) {
        case ActionTypes.Auction_Create_LOADING:
          return {
            ...state,
            dataLoading: true,
          };
        case ActionTypes.Auction_Create_SUCCESS:
          return {
            ...state,
            data: action.payload,
            dataLoading: false,
          };
        case ActionTypes.Auction_Create_FAIL:
          return {
            ...state,
            dataLoading: false,
          };
        default:
          return state;
      }
  }
  export  const getAuction = (state=INTIALSTATE,action)=>{
    switch (action.type) {
        case ActionTypes.Auction_Get_LOADING:
          return {
            ...state,
            dataLoading: true,
          };
        case ActionTypes.Auction_Get_SUCCESS:
          return {
            ...state,
            data: action.payload,
            dataLoading: false,
          };
        case ActionTypes.Auction_Get_FAIL:
          return {
            ...state,
            dataLoading: false,
          };
        default:
          return state;
      }
  }


  export  const deleteAuction = (state=INTIALSTATE,action)=>{
    switch (action.type) {
        case ActionTypes.Auction_Get_LOADING:
          return {
            ...state,
            dataLoading: true,
          };
        case ActionTypes.Auction_Get_SUCCESS:
          return {
            ...state,
            data: action.payload,
            dataLoading: false,
          };
        case ActionTypes.Auction_Get_FAIL:
          return {
            ...state,
            dataLoading: false,
          };
        default:
          return state;
      }
  }




  export  const createBid = (state=INTIALSTATE,action)=>{
    switch (action.type) {
        case ActionTypes.Bid_Create_LOADING:
          return {
            ...state,
            dataLoading: true,
          };
        case ActionTypes.Bid_Create_SUCCESS:
          return {
            ...state,
            data: action.payload,
            dataLoading: false,
          };
        case ActionTypes.Bid_Create_FAIL:
          return {
            ...state,
            dataLoading: false,
          };
        default:
          return state;
      }
  }