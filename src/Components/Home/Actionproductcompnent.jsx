import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addproduct from "./addproduct";
import {
  deleteAuction,
  deleteBid,
  getAuction,
} from "../../store/Auction product/action";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Actionproductcompnent.css";
import Bidmodalcomponent from "./Globalmodalcomponent";
import Loader from "../../helper/loader";
import LiveTimer from "../../helper/LiveTimer";
const Actionproductcompnent = () => {
  const { data } = useSelector((state) => state.getAuction);
  console.log("? ~ file: :", data);
  const userViewMode = useSelector((state) => state.changeTheMode.isdarkMode);
  const dispatch = useDispatch();
  const User = localStorage.getItem("User");
  const [selactedAuctionValue, setSelactedAuctionValue] =
    useState("All auction");
  const [selactedCategaryValue, setSelactedCategaryValue] =
    useState("All Categary");
  const [filterData, setFilterData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line

  const filterdData = () => {
    if (data) {
      setloading(false);
      const temp = [...data] || data;
      // =====// Auction Filter
      if (
        selactedAuctionValue === "All auction" &&
        selactedCategaryValue === "All Categary"
      ) {
        setFilterData(temp);
      }
      if (
        selactedAuctionValue === "All auction" &&
        selactedCategaryValue === "Electrical"
      ) {
        const update = temp.filter(
          (auctionDatas) => auctionDatas.product.Categary === "Electrical"
        );
        setFilterData(update);
      }

      if (
        selactedAuctionValue === "All auction" &&
        selactedCategaryValue === "Electronics"
      ) {
        const update = temp.filter(
          (data) => data.product.Categary === "Electronics"
        );
        setFilterData(update);
      }
      // =====// Categary Filter
      if (
        selactedCategaryValue === "All Categary" &&
        selactedAuctionValue === "Currunt auction"
      ) {
        const update = temp.filter(
          (data) => data.product.type === "Currunt auction"
        );
        setFilterData(update);
      }
      if (
        selactedAuctionValue === "Up Comming auction" &&
        selactedCategaryValue === "All Categary"
      ) {
        const update = temp.filter(
          (data) => data.product.type === "Up Comming auction"
        );
        setFilterData(update);
      }
      if (
        "Electrical" === "Up Comming auction" &&
        selactedCategaryValue === "Electrical"
      ) {
        const update = temp.filter(
          (data) => data.product.type === "Up Comming auction"
        );
        setFilterData(update);
      }
    }
  };

  useEffect(() => {
    filterdData();
  }, [data, selactedCategaryValue, selactedAuctionValue]); // eslint-disable-line
  const Categaries = ["All Categary", "Electrical", "Electronics"];
  const AuctionTypes = ["All auction", "Currunt auction", "Up Comming auction"];
  return (
    <div className={`main-container ${userViewMode && "theme"}`}>
      <div className={`Actionproductcompnent-filterbar ${userViewMode && "theme"} `}>
        <div>
          <label htmlFor="">Categary</label>
          <select
            name="Categary"
            id="Categary"
            value={selactedCategaryValue}
            onChange={(e) => setSelactedCategaryValue(e.target.value)}
          >
            {Categaries.map((Categary, index) => (
              <option key={index} value={Categary}>
                {Categary}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Auction Types</label>
          <select
            name="Auction Types"
            id="AuctionTypes"
            value={selactedAuctionValue}
            onChange={(e) => setSelactedAuctionValue(e.target.value)}
          >
            {AuctionTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="Actionproductcompnent-filterbar-lastchaild ">
          <Addproduct />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="actionCard ">
            {filterData.length ? (
              filterData &&
              filterData.filter((data) => data.product.confirmBid !== true).map(
                (data, index) =>
                (

                  <Card
                    key={index}
                    className={`mt-3 productcards ${userViewMode && "theme productcardstheme"}`}
                  >
                    <div className="liveTimer"><LiveTimer
                      targetTime={new Date(data?.product?.auctionEndTime).setHours(
                        new Date(data?.product?.auctionEndTime).getHours()
                      )}

                    /></div>
                    <Card.Img
                      variant="top"
                      src={data.product.file}
                      width={171}
                      height={180}
                    />
                    <Card.Body>
                      <Card.Text className="item">
                        <strong>Name: </strong>
                        {data?.product?.Name}
                      </Card.Text>
                      <Card.Text className="item">
                        <strong>Price: </strong>
                        {data?.product?.price}/Rs
                      </Card.Text>
                      <Card.Text className="item">
                        <strong>Categary: </strong>
                        {data?.product?.Categary}
                      </Card.Text>
                      <Card.Text className="item">
                        <strong>Type: </strong>
                        {data?.product?.type}
                      </Card.Text>
                      <Card.Text className="discription">
                        <strong>Discription: </strong>
                        {data?.product?.discription}
                      </Card.Text>
                      <div className="button-container">
                        {data?.product?.userId ===
                          localStorage.getItem("User") ? (
                          <>
                            <Bidmodalcomponent
                              title="Update"
                              heading="Update Auction"
                              id={data?.id}
                              Name={data?.product?.Name}
                              price={data?.product?.price}
                              discription={data?.product?.discription}
                              file={data?.product?.file}
                              type={data?.product?.type}
                            />
                            <Button
                              variant="danger"
                              onClick={() => {
                                dispatch(
                                  deleteAuction(data?.id, data.product.file)
                                );
                              }}
                            >
                              Delate
                            </Button>
                          </>
                        ) : data?.product?.bidder
                          .map((bidderData) => bidderData.bidderId)
                          .includes(User) ? (
                          <Button
                            variant="danger"
                            onClick={() => dispatch(deleteBid(data?.id))}
                          >
                            Cancel bid
                          </Button>
                        ) : (
                          <Bidmodalcomponent
                            title="Bid Here"
                            heading="Bid"
                            id={data?.id}
                            Name={data?.product?.Name}
                            price={data?.product?.price}
                            discription={data?.product?.discription}
                            file={data?.product?.file}
                            type={data?.product?.type}
                          />
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                )
              )
            ) : (
              <h1 className="m-5">Data Not Found</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Actionproductcompnent;
