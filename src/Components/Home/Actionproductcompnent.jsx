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
const Actionproductcompnent = () => {
  const { data } = useSelector((state) => state.getAuction);
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
      const temp = [...data];
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
          (data) => data.product.Categary === "Electrical"
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
    }
  };

  useEffect(() => {
    filterdData();
  }, [data, selactedCategaryValue, selactedAuctionValue]); // eslint-disable-line

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Actionproductcompnent-filterbar">
            <div>
              <label htmlFor="">Categary</label>
              <select
                name="select1"
                id="select1"
                value={selactedCategaryValue}
                onChange={(e) => setSelactedCategaryValue(e.target.value)}
              >
                <option value={"All Categary"}>All Categary</option>
                <option value={"Electrical"}>Electrical</option>
                <option value={"Electronics"}>Electronics</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Auction Types</label>
              <select
                name="select1"
                id="select1"
                value={selactedAuctionValue}
                onChange={(e) => setSelactedAuctionValue(e.target.value)}
              >
                <option value={"All auction"}>All auction</option>
                <option value={"Currunt auction"}>Currunt auction</option>
                <option value={"Up Comming auction"}>Up Comming auction</option>
              </select>
            </div>
            <div className="Actionproductcompnent-filterbar-lastchaild">
              <Addproduct />
            </div>
          </div>

          <div className="actionCard">
            {filterData.length ? (
              filterData &&
              filterData.map(
                (datas, index) =>
                  !datas.product.confirmBid && (
                    <Card
                      style={{
                        width: "18rem",
                        border: "none",
                        height: "66vh",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                      }}
                      key={index}
                      className=" mt-3 "
                    >
                      <Card.Img
                        variant="top"
                        src={datas.product.file}
                        width={171}
                        height={180}
                      />
                      <Card.Body>
                        <Card.Text className="item">
                          <strong>Name :</strong> {datas?.product?.Name}
                        </Card.Text>
                        <Card.Text className="item">
                          <strong>Price :</strong>
                          {datas?.product?.price}/Rs
                        </Card.Text>
                        <Card.Text className="item">
                          <strong>Categary :</strong>
                          {datas?.product?.Categary}
                        </Card.Text>
                        <Card.Text className="item">
                          <strong>Type :</strong>
                          {datas?.product?.type}
                        </Card.Text>
                        <Card.Text className="discription">
                          <strong>Discription :</strong>
                          {datas?.product?.discription}
                        </Card.Text>
                        <div className="button-container">
                          {datas?.product?.userId ===
                          localStorage.getItem("User") ? (
                            <>
                              <Bidmodalcomponent
                                title="Update"
                                heading="Update Auction"
                                id={datas?.id}
                                Name={datas?.product?.Name}
                                price={datas?.product?.price}
                                discription={datas?.product?.discription}
                                file={datas?.product?.file}
                                type={datas?.product?.type}
                              />
                              <Button
                                variant="danger"
                                onClick={() => {
                                  dispatch(
                                    deleteAuction(datas?.id, datas.product.file)
                                  );
                                }}
                              >
                                Delate
                              </Button>
                            </>
                          ) : datas?.product?.bidder
                              .map((bidderData) => bidderData.bidderId)
                              .includes(User) ? (
                            <Button
                              variant="danger"
                              onClick={() => dispatch(deleteBid(datas?.id))}
                            >
                              Cancel bid
                            </Button>
                          ) : (
                            <Bidmodalcomponent
                              title="Bid Here"
                              heading="Bid"
                              id={datas?.id}
                              Name={datas?.product?.Name}
                              price={datas?.product?.price}
                              discription={datas?.product?.discription}
                              file={datas?.product?.file}
                              type={datas?.product?.type}
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
    </>
  );
};

export default Actionproductcompnent;
