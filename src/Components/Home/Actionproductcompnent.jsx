import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addproduct from "./addproduct";
import { deleteAuction, getAuction } from "../../store/Auction product/action";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Actionproductcompnent.css";
import Bidmodalcomponent from "./Bidmodalcomponent";

const Actionproductcompnent = () => {
  const { data } = useSelector((state) => state.getAuction);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuction());
  }, []); // eslint-disable-line
  const [selactedAuctionValue, setSelactedAuctionValue] =
    useState("All auction");
  const [selactedCategaryValue, setSelactedCategaryValue] =
    useState("All Categary");

  return (
    <div>
      <div>
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
          <Addproduct />
        </div>
      </div>
      <div className="actionCard">
        {data &&
          data
            ?.filter(
              (filterData) =>
             (   selactedAuctionValue === filterData?.product?.type ||
                selactedAuctionValue === "All auction") ||
                (selactedCategaryValue === filterData?.product?.Categary ||
                selactedAuctionValue === "All Categary")
            )
            .map((datas, index) => (
              <Card
                style={{
                  width: "18rem",
                  border: "none",
                  height: "63vh",
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
                  <Card.Title className="item">
                    Name : {datas?.product?.Name}
                  </Card.Title>
                  <Card.Title className="item">
                    Price : {datas?.product?.price}/Rs
                  </Card.Title>
                  <Card.Title className="item">
                    Categary : {datas?.product?.Categary}
                  </Card.Title>
                  <Card.Title className="discription">
                    Discription : {datas?.product?.discription}
                  </Card.Title>
                  <div className="button-container">
                    {datas?.product?.userId === localStorage.getItem("User") ? (
                      <Button
                        variant="primary"
                        onClick={() => {
                          dispatch(deleteAuction(datas?.id));
                        }}
                      >
                        {" "}
                        Deleate Auction
                      </Button>
                    ) : (
                      <Bidmodalcomponent
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
            ))}
      </div>
    </div>
  );
};

export default Actionproductcompnent;
